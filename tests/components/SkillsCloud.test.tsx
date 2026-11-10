import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { gsap } from '@/app/animations/gsap';
import { TECH_LOGOS } from '@/app/data/portfolio';
import type { TechLogo } from '@/app/types/portfolio';
import { DESKTOP_MOUSE, REDUCED_MOTION, setMediaFeatures } from '@/tests/support/browser';
import SkillsCloud from '@/app/components/SkillsCloud';

function setup(): { section: HTMLElement; planes: HTMLElement[] } {
  render(<SkillsCloud />);
  const section = screen.getByRole('region', { name: 'My tech stack' });
  section.getBoundingClientRect = () => ({ left: 0, top: 0, width: 400, height: 200 }) as DOMRect;
  const planes = Array.from(section.querySelectorAll<HTMLElement>(':scope > [aria-hidden="true"]'));
  return { section, planes };
}

describe('SkillsCloud', () => {
  it('scatters every logo across the planes, inverting the dark ones', () => {
    setup();

    const logos: readonly TechLogo[] = Object.values(TECH_LOGOS);
    for (const logo of logos) {
      const image = screen.getByAltText(logo.name);
      expect(image.classList.contains('invert')).toBe(logo.dark === true);
    }
  });

  it('pulls each plane toward the mouse by its depth, then back when the mouse leaves', async () => {
    setMediaFeatures(DESKTOP_MOUSE);
    const { section, planes } = setup();

    // A mouse in the top-left corner pulls every plane up and to the left, nearer ones further.
    fireEvent.pointerMove(section, { pointerType: 'mouse', clientX: 0, clientY: 0 });
    await vi.waitFor(() => {
      const offsets = planes.map((plane) => Number(gsap.getProperty(plane, 'x')));
      for (const offset of offsets) expect(offset).toBeLessThan(0);
      const sortedNearestLast = [...offsets].sort((a, b) => b - a);
      expect(offsets).toEqual(sortedNearestLast);
      expect(new Set(offsets).size).toBe(offsets.length);
    });

    fireEvent.pointerLeave(section, { pointerType: 'mouse' });
    await vi.waitFor(() => {
      for (const plane of planes) expect(gsap.getProperty(plane, 'x')).toBe(0);
    });
  });

  it('leaves the planes alone when the reader prefers reduced motion', () => {
    setMediaFeatures([...DESKTOP_MOUSE, ...REDUCED_MOTION]);
    const { section, planes } = setup();

    fireEvent.pointerMove(section, { pointerType: 'mouse', clientX: 0, clientY: 0 });

    for (const plane of planes) expect(gsap.getTweensOf(plane)).toHaveLength(0);
  });
});

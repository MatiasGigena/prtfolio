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

  it('shifts each plane toward the mouse by its own depth, then back when the mouse leaves', async () => {
    setMediaFeatures(DESKTOP_MOUSE);
    const { section, planes } = setup();

    // The top-left corner is half the travel away from the centre on both axes.
    fireEvent.pointerMove(section, { pointerType: 'mouse', clientX: 0, clientY: 0 });
    await vi.waitFor(() => {
      const offsets = planes.map((plane) => Number(gsap.getProperty(plane, 'x')));
      expect(offsets).toEqual([-8.4, -10.5, -5.25, -12.6]);
    });

    fireEvent.pointerLeave(section, { pointerType: 'mouse' });
    await vi.waitFor(() => {
      for (const plane of planes) expect(gsap.getProperty(plane, 'x')).toBe(0);
    });
  });

  it('ignores touch and reduced-motion readers', async () => {
    setMediaFeatures([...DESKTOP_MOUSE, ...REDUCED_MOTION]);
    const { section, planes } = setup();

    fireEvent.pointerMove(section, { pointerType: 'mouse', clientX: 0, clientY: 0 });
    fireEvent.pointerMove(section, { pointerType: 'touch', clientX: 0, clientY: 0 });
    await new Promise((resolve) => setTimeout(resolve, 200));

    for (const plane of planes) expect(gsap.getProperty(plane, 'x')).toBe(0);
  });
});

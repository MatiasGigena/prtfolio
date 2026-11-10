import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { gsap } from '@/app/animations/gsap';
import { PROJECTS } from '@/app/data/portfolio';
import { DESKTOP_MOUSE, REDUCED_MOTION, setMediaFeatures } from '@/test/browser';
import ProjectPreview from './ProjectPreview';

function layers(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>('.project-preview > div'));
}

describe('ProjectPreview', () => {
  it('is decorative and shows one screenshot per project', () => {
    const { container } = render(<ProjectPreview activeIndex={null} projects={PROJECTS} />);

    expect(container.querySelector('.project-preview')).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelectorAll('img')).toHaveLength(PROJECTS.length);
  });

  it('moves the screenshot strip to the active project', () => {
    const { container, rerender } = render(<ProjectPreview activeIndex={1} projects={PROJECTS} />);
    const track = container.querySelector<HTMLElement>('.preview-track');
    expect(track?.style.transform).toBe('translate3d(0px, -100%, 0px)');

    rerender(<ProjectPreview activeIndex={3} projects={PROJECTS} />);
    expect(track?.style.transform).toBe('translate3d(0px, -300%, 0px)');
  });

  it('makes every layer trail a mouse pointer', async () => {
    setMediaFeatures(DESKTOP_MOUSE);
    const { container } = render(<ProjectPreview activeIndex={0} projects={PROJECTS} />);

    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 120, clientY: 80 }));

    await vi.waitFor(() => {
      for (const layer of layers(container)) {
        expect(gsap.getProperty(layer, 'x')).toBe(120);
        expect(gsap.getProperty(layer, 'y')).toBe(80);
      }
    });
  });

  it('stays put when the reader prefers reduced motion', async () => {
    setMediaFeatures([...DESKTOP_MOUSE, ...REDUCED_MOTION]);
    const { container } = render(<ProjectPreview activeIndex={0} projects={PROJECTS} />);

    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 120, clientY: 80 }));
    await new Promise((resolve) => setTimeout(resolve, 400));

    for (const layer of layers(container)) expect(gsap.getProperty(layer, 'x')).toBe(0);
  });
});

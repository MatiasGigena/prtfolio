import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { gsap } from '@/app/animations/gsap';
import ProjectPreview from '@/app/components/projects/ProjectPreview';
import { PROJECTS } from '@/app/data/portfolio';
import { DESKTOP_MOUSE, REDUCED_MOTION, TOUCH_SCREEN, setMediaFeatures } from '@/tests/support/browser';

function layers(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>('.project-preview > div'));
}

describe('ProjectPreview', () => {
  it('is decorative and holds one screenshot per project', () => {
    const { container } = render(<ProjectPreview index={0} visible={false} projects={PROJECTS} />);

    expect(container.querySelector('.project-preview')).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelectorAll('img')).toHaveLength(PROJECTS.length);
  });

  it('moves the screenshot strip to the chosen project and keeps it there while hidden', () => {
    const { container, rerender } = render(<ProjectPreview index={1} visible projects={PROJECTS} />);
    const track = container.querySelector<HTMLElement>('.preview-track');
    expect(track?.style.transform).toBe('translate3d(0px, -100%, 0px)');

    rerender(<ProjectPreview index={1} visible={false} projects={PROJECTS} />);
    expect(track?.style.transform).toBe('translate3d(0px, -100%, 0px)');
  });

  it('makes every layer trail a mouse pointer and shows them while visible', async () => {
    setMediaFeatures(DESKTOP_MOUSE);
    const { container } = render(<ProjectPreview index={0} visible projects={PROJECTS} />);

    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 120, clientY: 80 }));

    await vi.waitFor(() => {
      for (const layer of layers(container)) {
        expect(gsap.getProperty(layer, 'x')).toBe(120);
        expect(gsap.getProperty(layer, 'y')).toBe(80);
        expect(layer).toHaveAttribute('data-state', 'visible');
      }
    });
  });

  it('never appears where it cannot follow the pointer, so it is not left parked in a corner', () => {
    setMediaFeatures(TOUCH_SCREEN);
    const { container } = render(<ProjectPreview index={0} visible projects={PROJECTS} />);

    for (const layer of layers(container)) {
      expect(gsap.getTweensOf(layer)).toHaveLength(0);
      expect(layer).toHaveAttribute('data-state', 'hidden');
    }
  });

  it('neither follows nor appears when the reader prefers reduced motion', () => {
    setMediaFeatures([...DESKTOP_MOUSE, ...REDUCED_MOTION]);
    const { container } = render(<ProjectPreview index={0} visible projects={PROJECTS} />);

    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 120, clientY: 80 }));

    for (const layer of layers(container)) {
      expect(gsap.getTweensOf(layer)).toHaveLength(0);
      expect(layer).toHaveAttribute('data-state', 'hidden');
    }
  });
});

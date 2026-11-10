import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { gsap } from '@/app/animations/gsap';
import { REDUCED_MOTION, TOUCH_SCREEN, setMediaFeatures } from '@/tests/support/browser';
import TechGallery from '@/app/components/TechGallery';

function gallery(): HTMLElement {
  const element = document.querySelector<HTMLElement>('.tech-gallery');
  if (!element) throw new Error('Gallery missing');
  return element;
}

const columns = (): HTMLElement[] => Array.from(document.querySelectorAll<HTMLElement>('.tech-column'));

describe('TechGallery', () => {
  it('labels each logo with its technology', () => {
    render(<TechGallery />);

    expect(screen.getByRole('region', { name: 'Technology gallery' })).toBeInTheDocument();
    expect(columns()).toHaveLength(3);
    expect(screen.getAllByAltText('React')).toHaveLength(2);
    expect(screen.queryByAltText('Technology logo')).not.toBeInTheDocument();
  });

  it('hands the parallax to CSS where scroll-driven animations are supported', () => {
    vi.spyOn(CSS, 'supports').mockReturnValue(true);
    render(<TechGallery />);

    expect(gallery()).toHaveAttribute('data-parallax', 'scroll-driven');
    expect(columns()[1]?.style.getPropertyValue('--tech-travel-screens')).toBe('2.3');
  });

  it('drives the parallax from JS on desktops without scroll-driven animations', () => {
    vi.spyOn(CSS, 'supports').mockReturnValue(false);
    const { unmount } = render(<TechGallery />);

    expect(gallery()).toHaveAttribute('data-parallax', 'js');
    expect(columns()[0]?.style.top).toBe('-55%');
    for (const column of columns()) expect(gsap.getTweensOf(column)).toHaveLength(1);

    const [first] = columns();
    unmount();
    expect(gsap.getTweensOf(first ?? null)).toHaveLength(0);
  });

  it('holds the columns still on touch screens without scroll-driven animations', () => {
    vi.spyOn(CSS, 'supports').mockReturnValue(false);
    setMediaFeatures(TOUCH_SCREEN);
    render(<TechGallery />);

    expect(gallery()).toHaveAttribute('data-parallax', 'static');
    // Without parallax the columns start at the top so every logo is in view.
    for (const column of columns()) expect(column.style.top).toBe('0px');
  });

  it('holds the columns still when the reader prefers reduced motion', () => {
    setMediaFeatures(REDUCED_MOTION);
    vi.spyOn(CSS, 'supports').mockReturnValue(true);
    render(<TechGallery />);

    expect(gallery()).toHaveAttribute('data-parallax', 'static');
  });
});

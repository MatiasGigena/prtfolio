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

    expect(gallery()).toHaveClass('is-scroll-driven');
    expect(columns()[1]?.style.getPropertyValue('--tech-parallax')).toBe('2.3');
  });

  it('drives the parallax from JS on desktops without scroll-driven animations', () => {
    vi.spyOn(CSS, 'supports').mockReturnValue(false);
    const { unmount } = render(<TechGallery />);

    expect(gallery()).not.toHaveClass('is-scroll-driven');
    expect(gallery()).not.toHaveClass('is-static');
    for (const column of columns()) expect(gsap.getTweensOf(column)).toHaveLength(1);

    const [first] = columns();
    unmount();
    expect(gsap.getTweensOf(first ?? null)).toHaveLength(0);
  });

  it('holds the columns still on touch screens without scroll-driven animations', () => {
    vi.spyOn(CSS, 'supports').mockReturnValue(false);
    setMediaFeatures(TOUCH_SCREEN);
    render(<TechGallery />);

    expect(gallery()).toHaveClass('is-static');
  });

  it('holds the columns still when the reader prefers reduced motion', () => {
    setMediaFeatures(REDUCED_MOTION);
    vi.spyOn(CSS, 'supports').mockReturnValue(true);
    render(<TechGallery />);

    expect(gallery()).toHaveClass('is-static');
  });
});

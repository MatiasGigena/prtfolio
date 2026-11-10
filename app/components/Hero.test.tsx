import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { gsap } from '@/app/animations/gsap';
import { REDUCED_MOTION, setMediaFeatures } from '@/test/browser';
import Hero from './Hero';

function tickerCopies(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>('.hero-ticker p'));
}

describe('Hero', () => {
  it('introduces the page with the portrait and hides the decorative ticker from assistive tech', () => {
    const { container } = render(<Hero />);

    expect(screen.getByRole('region', { name: 'Introduction' })).toBeInTheDocument();
    expect(screen.getByAltText('Portrait of Matías Gigena')).toHaveAttribute('src', '/images/hero-portrait.png');
    expect(container.querySelector('.hero-ticker')).toHaveAttribute('aria-hidden', 'true');
    expect(tickerCopies(container)).toHaveLength(2);
  });

  it('runs the ticker to the left and stops it on unmount', async () => {
    const { container, unmount } = render(<Hero />);
    const [first] = tickerCopies(container);

    await vi.waitFor(() => expect(Number(gsap.getProperty(first ?? null, 'xPercent'))).toBeLessThan(0));

    unmount();
    const stoppedAt = gsap.getProperty(first ?? null, 'xPercent');
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(gsap.getProperty(first ?? null, 'xPercent')).toBe(stoppedAt);
  });

  it('keeps the ticker still when the reader prefers reduced motion', async () => {
    setMediaFeatures(REDUCED_MOTION);
    const { container } = render(<Hero />);

    await new Promise((resolve) => setTimeout(resolve, 100));

    for (const copy of tickerCopies(container)) expect(gsap.getProperty(copy, 'xPercent')).toBe(0);
  });
});

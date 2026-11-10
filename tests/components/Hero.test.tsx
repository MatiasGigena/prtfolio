import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { gsap } from '@/app/animations/gsap';
import { REDUCED_MOTION, setMediaFeatures } from '@/tests/support/browser';
import Hero from '@/app/components/Hero';

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

  it('runs the ticker to the left and unregisters it from the GSAP ticker on unmount', async () => {
    const add = vi.spyOn(gsap.ticker, 'add');
    const remove = vi.spyOn(gsap.ticker, 'remove');
    const { container, unmount } = render(<Hero />);
    const [first] = tickerCopies(container);

    await vi.waitFor(() => expect(Number(gsap.getProperty(first ?? null, 'xPercent'))).toBeLessThan(0));

    unmount();
    const [tick] = add.mock.calls.at(-1) ?? [];
    expect(remove).toHaveBeenCalledWith(tick);
  });

  it('keeps the ticker off and the slider still when the reader prefers reduced motion', () => {
    setMediaFeatures(REDUCED_MOTION);
    const add = vi.spyOn(gsap.ticker, 'add');
    const { container } = render(<Hero />);

    expect(add).not.toHaveBeenCalled();
    expect(gsap.getTweensOf(container.querySelector('.hero-ticker > div'))).toHaveLength(0);
  });
});

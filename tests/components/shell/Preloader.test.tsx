import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Preloader from '@/app/components/shell/Preloader';
import { REDUCED_MOTION, setMediaFeatures } from '@/tests/support/browser';

const greeting = (): HTMLElement | null => screen.queryByText('Get creative!');

// jsdom has no Web Animations API. Framer Motion uses it whenever it exists, so the stand-in is
// installed for these tests only.
const animate = vi.fn();

describe('Preloader', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(Element.prototype, 'animate', { configurable: true, value: animate });
  });
  afterEach(() => {
    vi.useRealTimers();
    animate.mockClear();
    delete (Element.prototype as Partial<Element>).animate;
  });

  it('greets the visitor while the page loads', () => {
    render(<Preloader />);
    expect(greeting()).toBeInTheDocument();
  });

  it('removes itself once its hold and exit animation have played, not before', () => {
    render(<Preloader />);

    act(() => vi.advanceTimersByTime(2299));
    expect(greeting()).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1));
    expect(greeting()).not.toBeInTheDocument();
  });

  it('sizes square cells so the columns span the screen', () => {
    const { container } = render(<Preloader />);
    const cell = container.querySelector<HTMLElement>('[data-preloader-cell]');

    expect(cell?.style.height).toBe('5vw');
    expect(cell?.parentElement?.style.width).toBe('5vw');
  });

  it('flashes a grid cell under the mouse but not under a finger', () => {
    const { container } = render(<Preloader />);
    const cell = container.querySelector('[data-preloader-cell]');
    if (!cell) throw new Error('Grid has no cells');

    fireEvent.pointerEnter(cell, { pointerType: 'touch' });
    expect(animate).not.toHaveBeenCalled();

    fireEvent.pointerEnter(cell, { pointerType: 'mouse' });
    expect(animate).toHaveBeenCalledOnce();
  });

  it('keeps the grid still when the reader prefers reduced motion', () => {
    setMediaFeatures(REDUCED_MOTION);
    const { container } = render(<Preloader />);
    const cell = container.querySelector('[data-preloader-cell]');
    if (!cell) throw new Error('Grid has no cells');

    fireEvent.pointerEnter(cell, { pointerType: 'mouse' });

    expect(animate).not.toHaveBeenCalled();
  });
});

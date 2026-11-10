import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Preloader from '@/app/components/shell/Preloader';
import { REDUCED_MOTION, setMediaFeatures } from '@/tests/support/browser';

const greeting = (): HTMLElement | null => screen.queryByText('Get creative!');

describe('Preloader', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

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

  it('flashes a grid cell under the mouse, but not for touch or reduced motion', () => {
    const animate = vi.fn();
    Element.prototype.animate = animate;
    const { container, unmount } = render(<Preloader />);
    const cell = (): Element => container.querySelector('[aria-hidden="true"] > div > div') as Element;

    // The grid is sized from the viewport after mounting.
    expect(cell()).not.toBeNull();
    fireEvent.pointerEnter(cell(), { pointerType: 'touch' });
    expect(animate).not.toHaveBeenCalled();

    fireEvent.pointerEnter(cell(), { pointerType: 'mouse' });
    expect(animate).toHaveBeenCalledOnce();

    unmount();
    setMediaFeatures(REDUCED_MOTION);
    animate.mockClear();
    const reduced = render(<Preloader />);
    fireEvent.pointerEnter(reduced.container.querySelector('[aria-hidden="true"] > div > div') as Element, {
      pointerType: 'mouse',
    });
    expect(animate).not.toHaveBeenCalled();
  });
});

import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Preloader from '@/app/components/Preloader';

describe('Preloader', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('greets the visitor while the page loads', () => {
    render(<Preloader onFinish={() => undefined} />);
    expect(screen.getByText('Get creative!')).toBeInTheDocument();
  });

  it('finishes once its hold and exit animation have played', () => {
    const onFinish = vi.fn();
    render(<Preloader onFinish={onFinish} />);

    act(() => vi.advanceTimersByTime(2299));
    expect(onFinish).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(1));
    expect(onFinish).toHaveBeenCalledOnce();
  });

  it('does not restart the countdown when the parent passes a new callback', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = render(<Preloader onFinish={first} />);

    act(() => vi.advanceTimersByTime(2000));
    rerender(<Preloader onFinish={second} />);
    act(() => vi.advanceTimersByTime(300));

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledOnce();
  });

  it('never finishes after it has been removed', () => {
    const onFinish = vi.fn();
    const { unmount } = render(<Preloader onFinish={onFinish} />);

    unmount();
    act(() => vi.advanceTimersByTime(5000));

    expect(onFinish).not.toHaveBeenCalled();
  });
});

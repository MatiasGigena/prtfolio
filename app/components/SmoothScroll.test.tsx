import { act, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DESKTOP_MOUSE, REDUCED_MOTION, TOUCH_SCREEN, setMediaFeatures } from '@/test/browser';
import SmoothScroll from './SmoothScroll';

const lenis = vi.hoisted(() => ({
  instances: [] as { destroy: ReturnType<typeof vi.fn>; on: ReturnType<typeof vi.fn> }[],
}));

vi.mock('lenis', () => ({
  default: vi.fn(function Lenis(this: unknown) {
    const instance = { destroy: vi.fn(), on: vi.fn() };
    lenis.instances.push(instance);
    return instance;
  }),
}));

describe('SmoothScroll', () => {
  beforeEach(() => {
    lenis.instances = [];
  });

  it('renders nothing', () => {
    const { container } = render(<SmoothScroll />);
    expect(container).toBeEmptyDOMElement();
  });

  it('smooths scrolling for a mouse on a wide screen and keeps ScrollTrigger in sync', () => {
    setMediaFeatures(DESKTOP_MOUSE);
    render(<SmoothScroll />);

    expect(lenis.instances).toHaveLength(1);
    expect(lenis.instances[0]?.on).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('leaves touch scrolling native', () => {
    setMediaFeatures(TOUCH_SCREEN);
    render(<SmoothScroll />);

    expect(lenis.instances).toHaveLength(0);
  });

  it('stops when reduced motion is switched on and resumes when it is switched off', () => {
    setMediaFeatures(DESKTOP_MOUSE);
    render(<SmoothScroll />);

    act(() => setMediaFeatures([...DESKTOP_MOUSE, ...REDUCED_MOTION]));
    expect(lenis.instances[0]?.destroy).toHaveBeenCalledOnce();

    act(() => setMediaFeatures(DESKTOP_MOUSE));
    expect(lenis.instances).toHaveLength(2);
  });

  it('cleans up on unmount', () => {
    setMediaFeatures(DESKTOP_MOUSE);
    const { unmount } = render(<SmoothScroll />);

    unmount();

    expect(lenis.instances[0]?.destroy).toHaveBeenCalledOnce();
  });
});

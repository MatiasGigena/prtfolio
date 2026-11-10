import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DESKTOP_MOUSE, REDUCED_MOTION, TOUCH_SCREEN, setMediaFeatures } from '@/tests/support/browser';
import SmoothScroll from '@/app/components/shell/SmoothScroll';

interface FakeLenis {
  readonly options: Record<string, unknown>;
  readonly destroy: ReturnType<typeof vi.fn>;
  readonly on: ReturnType<typeof vi.fn>;
  readonly scrollTo: ReturnType<typeof vi.fn>;
}

const lenis = vi.hoisted(() => ({ instances: [] as FakeLenis[] }));

vi.mock('lenis', () => ({
  default: vi.fn(function Lenis(this: unknown, options: Record<string, unknown>) {
    const instance = { options, destroy: vi.fn(), on: vi.fn(), scrollTo: vi.fn() };
    lenis.instances.push(instance);
    return instance;
  }),
}));

const OTHER_SITE_URL = 'https://example.com/';

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

  it('glides to a section link with Lenis instead of letting the browser jump first', () => {
    setMediaFeatures(DESKTOP_MOUSE);
    const pushState = vi.spyOn(window.history, 'pushState');
    render(
      <>
        <SmoothScroll />
        <a href='#about'>About</a>
        <section id='about' />
      </>,
    );

    const click = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
    screen.getByRole('link', { name: 'About' }).dispatchEvent(click);

    expect(click.defaultPrevented).toBe(true);
    expect(lenis.instances[0]?.scrollTo).toHaveBeenCalledWith(document.getElementById('about'));
    expect(pushState).toHaveBeenCalledWith(null, '', '#about');
  });

  it('leaves section links to the browser when Lenis is off', () => {
    setMediaFeatures(TOUCH_SCREEN);
    render(
      <>
        <SmoothScroll />
        <a href='#about'>About</a>
        <section id='about' />
      </>,
    );

    const click = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
    screen.getByRole('link', { name: 'About' }).dispatchEvent(click);

    expect(click.defaultPrevented).toBe(false);
  });

  it('ignores links to other pages and modified clicks', () => {
    setMediaFeatures(DESKTOP_MOUSE);
    render(
      <>
        <SmoothScroll />
        <a href='#about'>About</a>
        <a href={OTHER_SITE_URL}>Elsewhere</a>
        <section id='about' />
      </>,
    );

    const external = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
    screen.getByRole('link', { name: 'Elsewhere' }).dispatchEvent(external);
    const newTab = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0, metaKey: true });
    screen.getByRole('link', { name: 'About' }).dispatchEvent(newTab);

    expect(external.defaultPrevented).toBe(false);
    expect(newTab.defaultPrevented).toBe(false);
    expect(lenis.instances[0]?.scrollTo).not.toHaveBeenCalled();
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

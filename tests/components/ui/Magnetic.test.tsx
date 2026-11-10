import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { gsap } from '@/app/animations/gsap';
import { DESKTOP_MOUSE, TOUCH_SCREEN, setMediaFeatures } from '@/tests/support/browser';
import Magnetic from '@/app/components/ui/Magnetic';

function renderMagnet(): HTMLElement {
  render(
    <Magnetic>
      <button type='button'>Send</button>
    </Magnetic>,
  );
  const magnet = screen.getByRole('button').parentElement;
  if (!magnet) throw new Error('Magnet wrapper missing');
  magnet.getBoundingClientRect = () => ({ left: 0, top: 0, width: 100, height: 40 }) as DOMRect;
  return magnet;
}

describe('Magnetic', () => {
  it('wraps its content in an inline box', () => {
    const magnet = renderMagnet();
    expect(magnet.tagName).toBe('SPAN');
    expect(magnet).toHaveClass('inline-flex');
  });

  it('leans toward a mouse and settles back when it leaves', async () => {
    setMediaFeatures(DESKTOP_MOUSE);
    const magnet = renderMagnet();

    // 50px right of centre and 20px below it: it leans that way, in proportion.
    fireEvent.pointerMove(magnet, { pointerType: 'mouse', clientX: 100, clientY: 40 });
    await vi.waitFor(() => {
      const x = Number(gsap.getProperty(magnet, 'x'));
      const y = Number(gsap.getProperty(magnet, 'y'));
      expect(x).toBeGreaterThan(0);
      expect(y).toBeGreaterThan(0);
      expect(x / y).toBeCloseTo(50 / 20);
      expect(x).toBeLessThan(50);
    });

    fireEvent.pointerLeave(magnet);
    await vi.waitFor(() => expect(gsap.getProperty(magnet, 'x')).toBe(0));
  });

  it('ignores a finger or pen on a laptop that also has a mouse', () => {
    setMediaFeatures(DESKTOP_MOUSE);
    // Capture the x/y setters the follower is built from, to see exactly which moves reach them.
    const quickTo = vi.spyOn(gsap, 'quickTo').mockImplementation(() => vi.fn() as unknown as gsap.QuickToFunc);
    const magnet = renderMagnet();
    const setters = quickTo.mock.results.map((result) => result.value as ReturnType<typeof vi.fn>);

    fireEvent.pointerMove(magnet, { pointerType: 'touch', clientX: 100, clientY: 40 });
    fireEvent.pointerMove(magnet, { pointerType: 'pen', clientX: 100, clientY: 40 });
    for (const setter of setters) expect(setter).not.toHaveBeenCalled();

    fireEvent.pointerMove(magnet, { pointerType: 'mouse', clientX: 100, clientY: 40 });
    for (const setter of setters) expect(setter).toHaveBeenCalledOnce();
  });

  it('stays still on touch screens', () => {
    setMediaFeatures(TOUCH_SCREEN);
    const magnet = renderMagnet();

    fireEvent.pointerMove(magnet, { pointerType: 'touch', clientX: 100, clientY: 40 });

    expect(gsap.getTweensOf(magnet)).toHaveLength(0);
  });
});

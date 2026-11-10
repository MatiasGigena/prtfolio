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

    // 50px right of centre and 20px below it, pulled at 22%.
    fireEvent.pointerMove(magnet, { clientX: 100, clientY: 40 });
    await vi.waitFor(() => {
      expect(gsap.getProperty(magnet, 'x')).toBeCloseTo(11);
      expect(gsap.getProperty(magnet, 'y')).toBeCloseTo(4.4);
    });

    fireEvent.pointerLeave(magnet);
    await vi.waitFor(() => expect(gsap.getProperty(magnet, 'x')).toBe(0));
  });

  it('stays still on touch screens', () => {
    setMediaFeatures(TOUCH_SCREEN);
    const magnet = renderMagnet();

    fireEvent.pointerMove(magnet, { clientX: 100, clientY: 40 });

    expect(gsap.getTweensOf(magnet)).toHaveLength(0);
  });
});

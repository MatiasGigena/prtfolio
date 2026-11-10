import { describe, expect, it } from 'vitest';
import { DESKTOP_MOUSE, TOUCH_SCREEN, setMediaFeatures } from '@/tests/support/browser';
import { COARSE_POINTER_QUERY, FINE_POINTER_QUERY, hasFinePointer } from '@/app/animations/motion';

describe('pointer queries', () => {
  it('recognises a mouse as a fine pointer', () => {
    setMediaFeatures(DESKTOP_MOUSE);
    expect(hasFinePointer()).toBe(true);
    expect(window.matchMedia(COARSE_POINTER_QUERY).matches).toBe(false);
  });

  it('recognises a touch screen as a coarse pointer', () => {
    setMediaFeatures(TOUCH_SCREEN);
    expect(hasFinePointer()).toBe(false);
    expect(window.matchMedia(COARSE_POINTER_QUERY).matches).toBe(true);
  });

  it('keeps the fine and coarse queries mutually exclusive', () => {
    expect(FINE_POINTER_QUERY).not.toBe(COARSE_POINTER_QUERY);
  });
});

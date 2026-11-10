import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { COARSE_POINTER_QUERY, EASE_OUT_CSS, FINE_POINTER_QUERY } from '@/app/animations/motion';
import { DESKTOP_MOUSE, TOUCH_SCREEN, setMediaFeatures } from '@/tests/support/browser';

describe('EASE_OUT', () => {
  it('is the same curve CSS uses as --ease-out', () => {
    const css = readFileSync(resolve('app/globals.css'), 'utf8');
    const token = /--ease-out:\s*([^;]+);/.exec(css)?.[1]?.trim();

    expect(token).toBe(EASE_OUT_CSS);
  });
});

describe('pointer queries', () => {
  it('classify a mouse as fine and not coarse', () => {
    setMediaFeatures(DESKTOP_MOUSE);
    expect(window.matchMedia(FINE_POINTER_QUERY).matches).toBe(true);
    expect(window.matchMedia(COARSE_POINTER_QUERY).matches).toBe(false);
  });

  it('classify a touch screen as coarse and not fine', () => {
    setMediaFeatures(TOUCH_SCREEN);
    expect(window.matchMedia(FINE_POINTER_QUERY).matches).toBe(false);
    expect(window.matchMedia(COARSE_POINTER_QUERY).matches).toBe(true);
  });
});

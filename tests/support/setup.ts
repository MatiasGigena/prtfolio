import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { createElement, type ImgHTMLAttributes } from 'react';
import { afterEach, beforeEach, vi } from 'vitest';
import { FakeIntersectionObserver, matchMedia, setMediaFeatures } from './browser';

vi.mock('next/image', () => ({
  // A plain <img>: the optimisation pipeline is Next's concern, not these components'.
  default: ({
    priority: _priority,
    fill: _fill,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean; fill?: boolean }) =>
    createElement('img', props),
}));

Object.defineProperty(window, 'matchMedia', { configurable: true, value: matchMedia });
Object.defineProperty(window, 'IntersectionObserver', {
  configurable: true,
  value: FakeIntersectionObserver,
});
Element.prototype.scrollIntoView = vi.fn();
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;

if (!('PointerEvent' in window)) {
  class PointerEventPolyfill extends MouseEvent {
    readonly pointerType: string;

    constructor(type: string, init: PointerEventInit = {}) {
      super(type, init);
      this.pointerType = init.pointerType ?? '';
    }
  }
  Object.defineProperty(window, 'PointerEvent', { configurable: true, value: PointerEventPolyfill });
}

if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
  Object.defineProperty(window, 'CSS', { configurable: true, value: { supports: () => false } });
}

beforeEach(() => {
  setMediaFeatures([]);
  FakeIntersectionObserver.instances = [];
});

afterEach(() => {
  cleanup();
});

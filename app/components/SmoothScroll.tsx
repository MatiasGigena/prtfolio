'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';
import { ensureScrollTrigger } from '@/app/animations/gsap';
import { FINE_POINTER_QUERY, REDUCED_MOTION_QUERY } from '@/app/animations/motion';

const DESKTOP_POINTER_QUERY = `(min-width: 768px) and ${FINE_POINTER_QUERY}`;

function startLenis(): Lenis {
  const ScrollTrigger = ensureScrollTrigger();
  const lenis = new Lenis({
    autoRaf: true,
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
  });
  // ScrollTrigger reads the native scroll position, so it has to hear about Lenis's.
  lenis.on('scroll', ScrollTrigger.update);
  ScrollTrigger.refresh();
  return lenis;
}

/**
 * Runs Lenis while the screen is wide, the pointer is a mouse and the reader has not asked for
 * reduced motion, starting and stopping it as those change. Returns a function that tears it down.
 */
function syncSmoothScrolling(): () => void {
  const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
  const desktopPointer = window.matchMedia(DESKTOP_POINTER_QUERY);
  let lenis: Lenis | null = null;

  const update = (): void => {
    const enabled = desktopPointer.matches && !reducedMotion.matches;
    if (enabled && !lenis) lenis = startLenis();
    if (!enabled && lenis) {
      lenis.destroy();
      lenis = null;
    }
  };

  update();
  reducedMotion.addEventListener('change', update);
  desktopPointer.addEventListener('change', update);
  return () => {
    reducedMotion.removeEventListener('change', update);
    desktopPointer.removeEventListener('change', update);
    lenis?.destroy();
  };
}

/** Smooths wheel scrolling on wide screens with a mouse, unless the reader prefers reduced motion. */
export default function SmoothScroll(): null {
  useEffect(syncSmoothScrolling, []);
  return null;
}

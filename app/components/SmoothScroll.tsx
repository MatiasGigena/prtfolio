'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useEffect } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const DESKTOP_POINTER_QUERY = '(min-width: 768px) and (hover: hover) and (pointer: fine)';

export default function SmoothScroll(): null {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    const desktopPointer = window.matchMedia(DESKTOP_POINTER_QUERY);
    let lenis: Lenis | null = null;

    const start = (): void => {
      if (reducedMotion.matches || !desktopPointer.matches || lenis) return;

      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
      });
      lenis.on('scroll', ScrollTrigger.update);
      ScrollTrigger.refresh();
    };

    const stop = (): void => {
      lenis?.destroy();
      lenis = null;
    };

    const updateScrollingMode = (): void => {
      if (reducedMotion.matches || !desktopPointer.matches) {
        stop();
      } else {
        start();
      }
    };

    start();
    reducedMotion.addEventListener('change', updateScrollingMode);
    desktopPointer.addEventListener('change', updateScrollingMode);

    return () => {
      reducedMotion.removeEventListener('change', updateScrollingMode);
      desktopPointer.removeEventListener('change', updateScrollingMode);
      stop();
    };
  }, []);

  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    const target = document.querySelector(hash);
    if (!(target instanceof HTMLElement)) return;

    // Pinned sections only get their real height once ScrollTrigger has
    // measured them, so the browser's initial hash jump lands short.
    const realign = (): void => {
      ScrollTrigger.refresh();
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    };

    if (document.readyState === 'complete') {
      realign();
      return;
    }
    window.addEventListener('load', realign, { once: true });
    return () => window.removeEventListener('load', realign);
  }, []);

  return null;
}

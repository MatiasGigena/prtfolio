'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useEffect } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export default function SmoothScroll(): null {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    let lenis: Lenis | null = null;

    const start = (): void => {
      if (reducedMotion.matches || lenis) return;

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

    const updateMotionPreference = (): void => {
      if (reducedMotion.matches) {
        stop();
      } else {
        start();
      }
    };

    start();
    reducedMotion.addEventListener('change', updateMotionPreference);

    return () => {
      reducedMotion.removeEventListener('change', updateMotionPreference);
      stop();
    };
  }, []);

  return null;
}

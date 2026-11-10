'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';
import { ensureScrollTrigger } from '@/app/animations/gsap';
import { FINE_POINTER_QUERY, REDUCED_MOTION_QUERY } from '@/app/animations/motion';

const DESKTOP_POINTER_QUERY = `(min-width: 768px) and ${FINE_POINTER_QUERY}`;

/**
 * Sends clicks on same-page links (#work, #about...) through Lenis. Lenis's own `anchors` option
 * lets the browser jump first and then animates back from the old position, so the default is
 * prevented here and the hash is recorded by hand. Returns a function that stops listening.
 */
function glideToAnchors(lenis: Lenis): () => void {
  const handleClick = (event: MouseEvent): void => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) {
      return;
    }
    const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
    if (!(link instanceof HTMLAnchorElement)) return;
    const section = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    if (!section) return;

    event.preventDefault();
    lenis.scrollTo(section);
    window.history.pushState(null, '', link.hash);
  };
  document.addEventListener('click', handleClick);
  return () => document.removeEventListener('click', handleClick);
}

/** Starts Lenis and wires it to ScrollTrigger and section links; returns a function that stops it. */
function startLenis(): () => void {
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
  const stopGliding = glideToAnchors(lenis);
  return () => {
    stopGliding();
    lenis.destroy();
  };
}

/**
 * Runs Lenis while the screen is wide, the pointer is a mouse and the reader has not asked for
 * reduced motion, starting and stopping it as those change. Returns a function that tears it down.
 */
function syncSmoothScrolling(): () => void {
  const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
  const desktopPointer = window.matchMedia(DESKTOP_POINTER_QUERY);
  let stopLenis: (() => void) | null = null;

  const update = (): void => {
    const enabled = desktopPointer.matches && !reducedMotion.matches;
    if (enabled && !stopLenis) stopLenis = startLenis();
    if (!enabled && stopLenis) {
      stopLenis();
      stopLenis = null;
    }
  };

  update();
  reducedMotion.addEventListener('change', update);
  desktopPointer.addEventListener('change', update);
  return () => {
    reducedMotion.removeEventListener('change', update);
    desktopPointer.removeEventListener('change', update);
    stopLenis?.();
  };
}

/** Smooths wheel scrolling on wide screens with a mouse, unless the reader prefers reduced motion. */
export default function SmoothScroll(): null {
  useEffect(syncSmoothScrolling, []);
  return null;
}

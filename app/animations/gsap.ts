import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP drives everything tied to scroll position or the pointer; Framer Motion handles
// entrance and presence transitions.
export { gsap };

/**
 * Returns ScrollTrigger, registering it on first use (later calls are no-ops). Call it from
 * an effect before creating a trigger: registering writes inline styles on <body>, so doing it
 * at import time would change the DOM before React hydrates and trigger a mismatch warning.
 */
export function ensureScrollTrigger(): typeof ScrollTrigger {
  gsap.registerPlugin(ScrollTrigger);
  return ScrollTrigger;
}

const FOLLOW_EASE = 'power3.out';

/** Moves an element to a translation, easing over `duration` seconds and retargeting smoothly. */
export type Follower = (x: number, y: number) => void;

/** Makes `element` trail the offsets it is given, taking `duration` seconds to catch up. */
export function createFollower(element: HTMLElement, duration: number): Follower {
  const toX = gsap.quickTo(element, 'x', { duration, ease: FOLLOW_EASE });
  const toY = gsap.quickTo(element, 'y', { duration, ease: FOLLOW_EASE });
  return (x, y) => {
    toX(x);
    toY(y);
  };
}

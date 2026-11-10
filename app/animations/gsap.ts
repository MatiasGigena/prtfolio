import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP drives scroll-linked motion and pointer following; see the README's motion section for
// what Framer Motion, CSS and the Web Animations API handle instead.
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

/**
 * A tween whose progress follows the scroll position. It registers ScrollTrigger itself, so a
 * scroll tween can never be created before the plugin exists.
 */
export function scrollTween(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars,
  scrollTrigger: ScrollTrigger.Vars,
): gsap.core.Tween {
  ensureScrollTrigger();
  return gsap.to(targets, { ...vars, scrollTrigger });
}

/** The ease GSAP tweens share; it is close to EASE_OUT in feel. */
export const GSAP_EASE_OUT = 'power3.out';

export type Follower = (x: number, y: number) => void;

/** Makes `element` trail the offsets it is given, taking `duration` seconds to catch up. */
export function createFollower(element: HTMLElement, duration: number): Follower {
  const toX = gsap.quickTo(element, 'x', { duration, ease: GSAP_EASE_OUT });
  const toY = gsap.quickTo(element, 'y', { duration, ease: GSAP_EASE_OUT });
  return (x, y) => {
    toX(x);
    toY(y);
  };
}

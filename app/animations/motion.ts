/** The app's standard ease-out curve, shared by Framer Motion transitions and CSS (`--ease-out`). */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/** A mouse or trackpad: the primary pointer can hover and is precise. */
export const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';

/** A touch screen: the primary pointer cannot hover and is imprecise. */
export const COARSE_POINTER_QUERY = '(hover: none) and (pointer: coarse)';

/**
 * Components read the reduced-motion preference with Framer Motion's `useReducedMotion()`;
 * this query is only for code that has to listen for the preference changing.
 */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function hasFinePointer(): boolean {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

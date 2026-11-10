/**
 * The app's standard ease-out curve for Framer Motion and the Web Animations API. CSS reads the
 * same curve from `--ease-out` in app/styles/globals.css; a test keeps the two in step.
 */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/** EASE_OUT as a CSS timing function, for APIs that take a string. */
export const EASE_OUT_CSS = `cubic-bezier(${EASE_OUT.join(', ')})`;

/** A mouse or trackpad: the primary pointer can hover and is precise. */
export const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';

/** A touch screen: the primary pointer cannot hover and is imprecise. */
export const COARSE_POINTER_QUERY = '(hover: none) and (pointer: coarse)';

/**
 * Components read the reduced-motion preference with Framer Motion's `useReducedMotion()`;
 * this query is only for code that has to listen for the preference changing.
 */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

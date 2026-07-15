import type { Transition, Variants } from 'framer-motion';

export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

export const enterTransition: Transition = {
  duration: 0.45,
  ease: EASE_OUT,
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: enterTransition },
};

export const preloaderVariants: Variants = {
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
};

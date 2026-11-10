'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type JSX, type ReactNode } from 'react';
import { EASE_OUT } from '@/app/animations/motion';

/** Where the content slides in from; without one it simply fades in. */
type RevealOrigin = 'right' | 'below';

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly from?: RevealOrigin;
}

const ORIGIN_OFFSET: Record<RevealOrigin, string> = {
  right: 'translate3d(8%, 0, 0)',
  below: 'translate3d(0, 1.5rem, 0)',
};

/** Fades its content in, optionally sliding it into place, the first time it scrolls into view. */
export default function Reveal({ children, className, from }: RevealProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const reduceMotion = useReducedMotion();
  const hidden = { opacity: 0, transform: from ? ORIGIN_OFFSET[from] : 'none' };
  const shown = { opacity: 1, transform: from ? 'translate3d(0, 0, 0)' : 'none' };

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={hidden}
        animate={isInView ? shown : hidden}
        transition={{
          opacity: { duration: reduceMotion ? 0.2 : 0.45, ease: EASE_OUT },
          transform: { duration: reduceMotion ? 0 : 0.45, ease: EASE_OUT },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

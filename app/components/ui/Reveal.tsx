'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { EASE_OUT } from '@/app/animations/motion';

type RevealDirection = 'fade' | 'right' | 'up';

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly direction?: RevealDirection;
  readonly once?: boolean;
}

const hiddenTransform: Record<Exclude<RevealDirection, 'fade'>, string> = {
  right: 'translate3d(8%, 0, 0)',
  up: 'translate3d(0, 1.5rem, 0)',
};

export default function Reveal({
  children,
  className,
  direction = 'fade',
  once = true,
}: RevealProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-10%' });
  const reduceMotion = useReducedMotion();
  const transform = direction === 'fade' || reduceMotion ? 'none' : hiddenTransform[direction];

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, transform }}
        animate={isInView ? { opacity: 1, transform: 'none' } : { opacity: 0, transform }}
        transition={{ duration: reduceMotion ? 0.2 : 0.45, ease: EASE_OUT }}
      >
        {children}
      </motion.div>
    </div>
  );
}

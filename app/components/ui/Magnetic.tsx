'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, type ReactNode, type JSX } from 'react';
import { createFollower, gsap } from '@/app/animations/gsap';
import { hasFinePointer } from '@/app/animations/motion';

/** Fraction of the pointer's distance from the centre that the content leans toward it. */
const PULL = 0.22;
const FOLLOW_DURATION = 0.3;

interface MagneticProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/** Makes `element` lean toward the pointer while it hovers; returns a cleanup. */
function magnetize(element: HTMLElement): () => void {
  const follow = createFollower(element, FOLLOW_DURATION);
  const handlePointerMove = (event: PointerEvent): void => {
    const { height, width, left, top } = element.getBoundingClientRect();
    follow((event.clientX - (left + width / 2)) * PULL, (event.clientY - (top + height / 2)) * PULL);
  };
  const reset = (): void => follow(0, 0);

  element.addEventListener('pointermove', handlePointerMove);
  element.addEventListener('pointerleave', reset);
  return () => {
    element.removeEventListener('pointermove', handlePointerMove);
    element.removeEventListener('pointerleave', reset);
    gsap.killTweensOf(element);
  };
}

/** Leans its content toward a hovering mouse and springs back when the pointer leaves. */
export default function Magnetic({ children, className }: MagneticProps): JSX.Element {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduceMotion || !hasFinePointer()) return;
    return magnetize(element);
  }, [reduceMotion]);

  return (
    <span ref={ref} className={`inline-flex ${className ?? ''}`}>
      {children}
    </span>
  );
}

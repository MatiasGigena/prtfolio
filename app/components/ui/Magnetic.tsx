'use client';

import { gsap } from 'gsap';
import { useEffect, useRef, type ReactNode } from 'react';

interface MagneticProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export default function Magnetic({ children, className }: MagneticProps): JSX.Element {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!element || !finePointer.matches || reducedMotion.matches) return;

    const moveX = gsap.quickTo(element, 'x', { duration: 0.3, ease: 'power3.out' });
    const moveY = gsap.quickTo(element, 'y', { duration: 0.3, ease: 'power3.out' });

    const handlePointerMove = (event: PointerEvent): void => {
      const { height, width, left, top } = element.getBoundingClientRect();
      moveX((event.clientX - (left + width / 2)) * 0.22);
      moveY((event.clientY - (top + height / 2)) * 0.22);
    };
    const reset = (): void => {
      moveX(0);
      moveY(0);
    };

    element.addEventListener('pointermove', handlePointerMove);
    element.addEventListener('pointerleave', reset);
    return () => {
      element.removeEventListener('pointermove', handlePointerMove);
      element.removeEventListener('pointerleave', reset);
      gsap.killTweensOf(element);
    };
  }, []);

  return (
    <span ref={ref} className={`inline-flex ${className ?? ''}`}>
      {children}
    </span>
  );
}

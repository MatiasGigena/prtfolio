'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, type JSX } from 'react';
import { ensureScrollTrigger, gsap } from '@/app/animations/gsap';

/** Brings the letters of `container` to full strength one by one as it scrolls through. */
function revealLettersOnScroll(container: HTMLElement): () => void {
  ensureScrollTrigger();
  const tween = gsap.to(container.querySelectorAll<HTMLElement>('[data-letter]'), {
    opacity: 1,
    ease: 'none',
    stagger: 0.02,
    scrollTrigger: {
      trigger: container,
      start: 'top 85%',
      end: 'bottom 35%',
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  return () => tween.revert();
}

interface ProjectStatementProps {
  readonly text: string;
}

export default function ProjectStatement({ text }: ProjectStatementProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    // With reduced motion the letters are simply shown at full strength by CSS.
    if (!container || reduceMotion) return;
    return revealLettersOnScroll(container);
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      className='flex items-center 3xl:px-6 mt-8 lg:mt-16 justify-start lg:justify-evenly text-white py-8 lg:py-12'
    >
      <div className='w-11/12 flex items-center h-full flex-wrap'>
        {text.split(' ').map((word, wordIndex) => (
          <p className='text-[4vw] mr-3 mb-2' key={`${word}-${wordIndex}`}>
            {Array.from(word).map((letter, letterIndex) => (
              <span data-letter className='opacity-50 motion-reduce:opacity-100' key={`${letter}-${letterIndex}`}>
                {letter}
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, type JSX } from 'react';
import { ensureScrollTrigger, gsap } from '@/app/animations/gsap';
import { WORK_STATEMENT } from '@/app/data/portfolio';

export default function ProjectStatement(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const letters = element.querySelectorAll<HTMLElement>('[data-letter]');

    if (reduceMotion) {
      gsap.set(letters, { opacity: 1 });
      return;
    }

    ensureScrollTrigger();
    const context = gsap.context(() => {
      gsap.to(letters, {
        opacity: 1,
        ease: 'none',
        stagger: 0.02,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 35%',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, element);
    return () => context.revert();
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      className='flex items-center 3xl:px-6 mt-8 lg:mt-16 justify-start lg:justify-evenly text-white py-8 lg:py-12'
    >
      <div className='w-11/12 flex items-center h-full flex-wrap'>
        {WORK_STATEMENT.split(' ').map((word, wordIndex) => (
          <p className='text-[4vw] mr-3 mb-2' key={`${word}-${wordIndex}`}>
            {Array.from(word).map((letter, letterIndex) => (
              <span data-letter className='opacity-50' key={`${letter}-${letterIndex}`}>
                {letter}
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}

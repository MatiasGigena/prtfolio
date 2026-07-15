'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

const STATEMENT =
  "It's not just a Project. I take pride in crafting digital experiences that not only meet functional requirements but also delight users with intuitive interfaces and smooth interactions.";

export default function ProjectStatement(): JSX.Element {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = container.current;
    if (!element) return;
    const letters = element.querySelectorAll<HTMLElement>('[data-letter]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      gsap.set(letters, { opacity: 1 });
      return;
    }

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
  }, []);

  return (
    <div
      ref={container}
      className='flex items-center xlxl:px-6 mt-8 lg:mt-16 justify-start lg:justify-evenly text-sec py-8 lg:py-12'
    >
      <div className='w-11/12 flex items-center h-full flex-wrap'>
        {STATEMENT.split(' ').map((word, wordIndex) => (
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

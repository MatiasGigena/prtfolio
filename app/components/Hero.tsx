'use client';

import { useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { ensureScrollTrigger, gsap } from '@/app/animations/gsap';

/** How far the ticker text travels, in percent of its width per millisecond. */
const TICKER_SPEED = 0.006;
/** Longest frame the ticker accounts for, so a stalled tab does not make the text jump. */
const MAX_FRAME_MS = 32;
/** How far the whole ticker slides left while the first screen scrolls away. */
const SCROLL_SHIFT_PX = -500;

type Direction = 1 | -1;

/**
 * Scrolls the two copies of the ticker text sideways forever, in the direction
 * `getDirection` reports on each frame. Returns a function that stops the loop.
 */
function loopTicker(copies: readonly HTMLElement[], getDirection: () => Direction): () => void {
  let xPercent = 0;
  const tick = (_time: number, deltaTime: number): void => {
    xPercent += Math.min(deltaTime, MAX_FRAME_MS) * TICKER_SPEED * getDirection();
    // The second copy sits one width to the right, so wrapping by 100% is seamless.
    if (xPercent < -100) xPercent += 100;
    if (xPercent > 0) xPercent -= 100;
    gsap.set(copies, { xPercent });
  };
  gsap.ticker.add(tick);
  return () => gsap.ticker.remove(tick);
}

/** Slides the ticker left as the first screen scrolls away and reports each scroll direction. */
function shiftWithScroll(slider: HTMLElement, onScroll: (direction: Direction) => void): gsap.core.Tween {
  ensureScrollTrigger();
  return gsap.to(slider, {
    x: SCROLL_SHIFT_PX,
    ease: 'none',
    scrollTrigger: {
      trigger: document.documentElement,
      scrub: 0.25,
      start: 0,
      end: () => window.innerHeight,
      invalidateOnRefresh: true,
      onUpdate: (self) => onScroll(self.direction === 1 ? 1 : -1),
    },
  });
}

export default function Hero(): JSX.Element {
  const firstTextRef = useRef<HTMLParagraphElement>(null);
  const secondTextRef = useRef<HTMLParagraphElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const slider = sliderRef.current;
    const copies = [firstTextRef.current, secondTextRef.current];
    if (reduceMotion || !slider || !copies[0] || !copies[1]) return;

    // The text runs left by default and against the scroll direction once the page moves.
    let direction: Direction = -1;
    const stopTicker = loopTicker([copies[0], copies[1]], () => direction);
    const tween = shiftWithScroll(slider, (scrollDirection) => {
      direction = scrollDirection === 1 ? -1 : 1;
    });
    return () => {
      stopTicker();
      tween.revert();
    };
  }, [reduceMotion]);

  return (
    <section
      className='h-screen bg-black relative overflow-hidden flex'
      aria-label='Introduction'
    >
      <Image
        src='/images/hero-portrait.png'
        width={981}
        height={1473}
        alt='Portrait of Matías Gigena'
        priority
        className='hero-portrait'
        sizes='100vw'
      />
      <div className='hero-ticker' aria-hidden='true'>
        <div ref={sliderRef} className='relative whitespace-nowrap will-change-transform'>
          <p
            ref={firstTextRef}
            className='text-white text-[6rem] pr-8 sm:text-[230px] sm:pr-[50px] m-0 relative font-thin'
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
          >
            Front End Developer -
          </p>
          <p
            ref={secondTextRef}
            className='text-white text-[6rem] pr-8 sm:text-[230px] sm:pr-[50px] top-0 font-thin absolute left-[100%]'
          >
            Front End Developer -
          </p>
        </div>
      </div>
    </section>
  );
}

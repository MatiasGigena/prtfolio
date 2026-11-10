'use client';

import { useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, type JSX } from 'react';
import { ensureScrollTrigger, gsap } from '@/app/animations/gsap';

/** How far the ticker text travels, in percent of its width per millisecond. */
const TICKER_SPEED = 0.006;
/** Longest frame the ticker accounts for, so a stalled tab does not make the text jump. */
const MAX_FRAME_MS = 32;
/** How far the whole ticker slides left while the first screen scrolls away. */
const SCROLL_SHIFT_PX = -500;
/** Both copies of the ticker text look the same; only their positions differ. */
const TICKER_TEXT_CLASS =
  'text-white text-[6rem] pr-8 sm:text-[230px] sm:pr-[50px] font-thin [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]';

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

/**
 * Slides the ticker left as the first screen scrolls away, and on every scroll reports the
 * direction the text should run: against the scroll.
 */
function shiftWithScroll(
  slider: HTMLElement,
  setTickerDirection: (direction: Direction) => void,
): gsap.core.Tween {
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
      onUpdate: (self) => setTickerDirection(self.direction === 1 ? -1 : 1),
    },
  });
}

/** Starts the ticker loop and its scroll shift; returns a function that stops both. */
function startTicker(slider: HTMLElement, copies: readonly HTMLElement[]): () => void {
  // The text runs left until the page first scrolls.
  let direction: Direction = -1;
  const stopLoop = loopTicker(copies, () => direction);
  const tween = shiftWithScroll(slider, (next) => {
    direction = next;
  });
  return () => {
    stopLoop();
    tween.revert();
  };
}

export default function Hero(): JSX.Element {
  const firstTextRef = useRef<HTMLParagraphElement>(null);
  const secondTextRef = useRef<HTMLParagraphElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const slider = sliderRef.current;
    const first = firstTextRef.current;
    const second = secondTextRef.current;
    if (reduceMotion || !slider || !first || !second) return;
    return startTicker(slider, [first, second]);
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
          <p ref={firstTextRef} className={`${TICKER_TEXT_CLASS} relative`}>
            Front End Developer -
          </p>
          <p ref={secondTextRef} className={`${TICKER_TEXT_CLASS} absolute left-full top-0`}>
            Front End Developer -
          </p>
        </div>
      </div>
    </section>
  );
}

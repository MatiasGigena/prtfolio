'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const TICKER_SPEED = 0.006;

export default function Hero(): JSX.Element {
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frameId = 0;
    let xPercent = 0;
    let direction = -1;
    let previousTime = performance.now();

    const context = gsap.context(() => {
      if (!reduceMotion) {
        gsap.to(slider.current, {
          x: -500,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            scrub: 0.25,
            start: 0,
            end: window.innerHeight,
            onUpdate: (self) => {
              direction = self.direction * -1;
            },
          },
        });
      }
    });

    const tick = (time: number): void => {
      const elapsed = Math.min(time - previousTime, 32);
      previousTime = time;
      xPercent += elapsed * TICKER_SPEED * direction;
      if (xPercent < -100) xPercent += 100;
      if (xPercent > 0) xPercent -= 100;
      gsap.set([firstText.current, secondText.current], { xPercent });
      frameId = requestAnimationFrame(tick);
    };

    if (!reduceMotion) frameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameId);
      context.revert();
    };
  }, []);

  return (
    <section
      className='h-screen bg-black relative overflow-hidden flex'
      style={{ position: 'relative' }}
      aria-label='Introduction'
    >
      <Image
        src='/images/portfolio12-removebg.png'
        width={981}
        height={1473}
        alt='Portrait of Matías Gigena'
        priority
        className='my-image absolute inset-0 h-full w-full'
        style={{ height: '100%', width: '100%' }}
        sizes='100vw'
      />
      <div className='sliderContainer' aria-hidden='true'>
        <div ref={slider} className='relative whitespace-nowrap will-change-transform'>
          <p
            ref={firstText}
            className='text-white text-[6rem] pr-8 sm:text-[230px] sm:pr-[50px] m-0 relative font-thin'
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
          >
            Front End Developer -
          </p>
          <p
            ref={secondText}
            className='text-white text-[6rem] pr-8 sm:text-[230px] sm:pr-[50px] top-0 font-thin absolute left-[100%]'
          >
            Front End Developer -
          </p>
        </div>
      </div>
    </section>
  );
}

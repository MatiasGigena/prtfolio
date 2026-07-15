'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { ABOUT_PHRASES, CONTACT_PHRASE } from '@/app/data/portfolio';
import { ExpandCircleDownIcon } from './ui/Icons';
import Reveal from './ui/Reveal';
import RichText from './ui/RichText';

export default function About(): JSX.Element {
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const track = trackRef.current;
    const trigger = triggerRef.current;
    if (!track || !trigger) return;

    const context = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)': () => {
          gsap.to(track, {
            xPercent: -75,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top top',
              end: '+=2000',
              scrub: 0.6,
              pin: true,
              invalidateOnRefresh: true,
            },
          });
        },
      });
    }, trigger);
    return () => context.revert();
  }, []);

  return (
    <section id='About' className='w-full lg:overflow-hidden'>
      <div ref={triggerRef}>
        <div
          ref={trackRef}
          className='lg:w-[400vw] w-full flex relative lg:flex-row flex-col lg:gap-0 lg:my-0 will-change-transform'
        >
          <div className='h-screen flex-col w-full lg:w-[100vw] flex justify-center gap-24 lg:gap-14 items-center'>
            <Reveal direction='up'>
              <h2 className='text-5xl sm:text-7xl'>
                About <span className='text-white font-bold'>ME.</span>
              </h2>
            </Reveal>
            <RichText phrases={ABOUT_PHRASES[0]} />
          </div>
          <div className='h-[80vh] lg:h-screen w-full lg:w-[100vw] flex justify-center items-center'>
            <RichText phrases={ABOUT_PHRASES[1]} />
          </div>
          <div className='h-[80vh] lg:h-screen w-full lg:w-[100vw] flex justify-center items-center'>
            <RichText phrases={ABOUT_PHRASES[2]} />
          </div>
          <div className='h-screen w-full lg:w-[100vw] flex flex-col justify-center z-20 gap-20 items-center'>
            <RichText phrases={CONTACT_PHRASE} variant='title' />
            <span className='scroll-cue' aria-hidden='true'>
              <ExpandCircleDownIcon size={96} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

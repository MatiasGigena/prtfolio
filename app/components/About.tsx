'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, type UIEvent } from 'react';
import { ABOUT_CHAPTERS } from '@/app/data/portfolio';

export default function About(): JSX.Element {
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const track = trackRef.current;
    const trigger = triggerRef.current;
    const progress = progressRef.current;
    if (!track || !trigger || !progress) return;

    const context = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)': () => {
          gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top top',
              end: () => `+=${track.scrollWidth - window.innerWidth}`,
              scrub: 0.55,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: ({ progress: scrollProgress }) => {
                progress.style.transform = `scaleX(${scrollProgress})`;
              },
            },
          });
        },
      });
    }, trigger);

    return () => context.revert();
  }, []);

  const updateMobileProgress = (event: UIEvent<HTMLDivElement>): void => {
    if (window.innerWidth >= 1024) return;
    const track = event.currentTarget;
    const scrollableWidth = track.scrollWidth - track.clientWidth;
    const progress = scrollableWidth > 0 ? track.scrollLeft / scrollableWidth : 0;
    if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
  };

  return (
    <section
      id='About'
      className='about-section w-full overflow-hidden bg-[#050505] text-white'
      aria-labelledby='about-heading'
    >
      <div ref={triggerRef} className='about-trigger relative lg:h-screen'>
        <header className='relative z-20 px-5 pt-20 sm:px-8 lg:absolute lg:inset-x-0 lg:top-0 lg:px-12 lg:pt-9 xl:px-16'>
          <div className='mx-auto flex max-w-[90rem] items-end justify-between gap-6'>
            <div>
              <p className='text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/45'>
                About / Four notes
              </p>
              <h2
                id='about-heading'
                className='mt-2 text-4xl font-medium leading-none tracking-[-0.04em] sm:text-5xl'
              >
                More than a bio.
              </h2>
            </div>
            <p className='hidden max-w-64 text-right text-sm leading-relaxed text-white/50 sm:block'>
              Scroll to follow the story. Swipe on touch screens.
            </p>
          </div>
          <div className='mx-auto mt-6 h-px max-w-[90rem] overflow-hidden bg-white/15'>
            <div
              ref={progressRef}
              className='h-full origin-left scale-x-0 bg-white will-change-transform'
            />
          </div>
        </header>

        <div
          ref={trackRef}
          className='about-track mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-16 outline-none sm:px-8 lg:mt-0 lg:h-full lg:w-max lg:snap-none lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0'
          role='region'
          aria-label='Four chapters about Matías'
          tabIndex={0}
          onScroll={updateMobileProgress}
        >
          {ABOUT_CHAPTERS.map((chapter, index) => (
            <article
              key={chapter.id}
              aria-labelledby={`about-${chapter.id}`}
              className='about-panel relative flex min-h-[35rem] w-[88vw] shrink-0 snap-center overflow-hidden rounded-[2rem] border border-white/10 bg-[#0e0f14] p-7 sm:w-[72vw] sm:p-10 lg:h-screen lg:w-screen lg:snap-none lg:items-center lg:rounded-none lg:border-0 lg:bg-transparent lg:px-12 lg:pb-16 lg:pt-36 xl:px-16'
            >
              <div className='relative z-10 mx-auto flex w-full max-w-[90rem] flex-col justify-between gap-12 lg:grid lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.75fr)] lg:items-end lg:gap-20'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.22em] text-white/45'>
                    {chapter.eyebrow}
                  </p>
                  <h3
                    id={`about-${chapter.id}`}
                    className='mt-6 max-w-[15ch] text-[clamp(2.65rem,6.3vw,6.75rem)] font-medium leading-[0.94] tracking-[-0.055em]'
                  >
                    {chapter.title}
                  </h3>
                </div>

                <div className='lg:pb-2'>
                  <p className='max-w-xl text-base leading-relaxed text-white/65 sm:text-lg lg:text-xl'>
                    {chapter.body}
                  </p>
                  <ul className='mt-8 flex flex-wrap gap-2' aria-label='Chapter highlights'>
                    {chapter.details.map((detail) => (
                      <li
                        key={detail}
                        className='rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/65 sm:text-sm'
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                  {chapter.cta ? (
                    <a
                      href={chapter.cta.href}
                      className='about-cta pressable mt-9 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black'
                    >
                      {chapter.cta.label}
                      <span aria-hidden='true'>↘</span>
                    </a>
                  ) : null}
                </div>
              </div>

              <span
                aria-hidden='true'
                className='absolute -bottom-10 right-2 text-[10rem] font-semibold leading-none tracking-[-0.08em] text-white/[0.06] sm:text-[14rem] lg:bottom-6 lg:right-12 lg:text-[19rem]'
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

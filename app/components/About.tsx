'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type JSX } from 'react';
import { EASE_OUT } from '@/app/animations/motion';
import { ABOUT, SECTION_IDS } from '@/app/data/portfolio';
import { ArrowDownRightIcon } from './ui/Icons';

const SECTION_WORD = 'About';

interface Focus {
  /** Which block is being read: 0 is the introduction, then one per topic. */
  readonly index: number;
  /** 1 when the reader moved down to get here, -1 when they moved back up. */
  readonly direction: 1 | -1;
}

/**
 * Reports which block of `list` is being read: the one crossing the middle of the viewport.
 * Blocks are marked with `data-block` and numbered in document order. Returns a cleanup.
 */
function trackReadingPosition(list: HTMLElement, onRead: (blockIndex: number) => void): () => void {
  const blockIndex = new Map<Element, number>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const index = blockIndex.get(entry.target);
        if (entry.isIntersecting && index !== undefined) onRead(index);
      }
    },
    { rootMargin: '-50% 0px -50% 0px' },
  );
  list.querySelectorAll('[data-block]').forEach((block, index) => {
    blockIndex.set(block, index);
    observer.observe(block);
  });
  return () => observer.disconnect();
}

/**
 * An introduction, then question and answer. The heading stays in view while the blocks
 * scroll past; each takes focus in turn and the heading changes to that block's word.
 */
export default function About(): JSX.Element {
  const listRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState<Focus>({ index: 0, direction: 1 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    return trackReadingPosition(list, (index) =>
      setFocus((current) =>
        current.index === index ? current : { index, direction: index > current.index ? 1 : -1 },
      ),
    );
  }, []);

  const word = ABOUT.topics[focus.index - 1]?.word ?? SECTION_WORD;
  const offset = (from: 1 | -1): string => (reduceMotion ? '0%' : from > 0 ? '100%' : '-100%');
  const blockClassName = (index: number): string =>
    `transition-opacity duration-300 motion-reduce:!opacity-100 ${
      index === focus.index ? 'opacity-100' : 'opacity-[0.35]'
    }`;
  const answerClassName =
    'max-w-[26em] text-[clamp(1.5rem,2.7vw,2.6rem)] font-light leading-[1.18] tracking-[-0.025em]';

  return (
    <section id={SECTION_IDS.about} className='w-full bg-black text-white' aria-labelledby='about-heading'>
      <div className='mx-auto grid max-w-[90rem] px-5 py-24 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20 lg:px-12 lg:py-40 xl:px-16'>
        {/* Small screens: these children join the grid directly, so the heading can stick to the
            top for the whole section. Large screens: the column rides the middle of the viewport,
            level with the block being read; 6.5rem is about half the column's own height. */}
        <div className='max-lg:contents lg:sticky lg:top-[calc(var(--screen-h)/2-6.5rem)] lg:self-start lg:[container-type:inline-size]'>
          {/* On large screens the type is sized from the column (cqw) so the widest word always fits. */}
          <h2
            id='about-heading'
            className="sticky top-0 z-10 -mx-5 bg-black px-5 pb-3 pt-4 text-[clamp(3.5rem,10vw,6.5rem)] font-thin leading-none tracking-[-0.05em] after:absolute after:inset-x-0 after:top-full after:h-8 after:bg-gradient-to-b after:from-black after:to-transparent after:content-[''] sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:bg-transparent lg:p-0 lg:text-[26cqw] lg:after:hidden"
          >
            <span className='sr-only'>{SECTION_WORD}</span>
            <span className='relative block overflow-y-clip pb-[0.08em]' aria-hidden='true'>
              <AnimatePresence initial={false} mode='popLayout' custom={focus.direction}>
                <motion.span
                  key={word}
                  className='block whitespace-nowrap'
                  custom={focus.direction}
                  variants={{
                    enter: (direction: 1 | -1) => ({ y: offset(direction), opacity: 0 }),
                    shown: { y: '0%', opacity: 1 },
                    exit: (direction: 1 | -1) => ({
                      y: offset(direction > 0 ? -1 : 1),
                      opacity: 0,
                    }),
                  }}
                  initial='enter'
                  animate='shown'
                  exit='exit'
                  transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE_OUT }}
                >
                  {word}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
          <div className='mt-4 max-lg:order-last lg:mt-10'>
            <a
              href={`#${ABOUT.cta.target}`}
              className='pressable inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
            >
              {ABOUT.cta.label}
              <ArrowDownRightIcon className='h-4 w-4' strokeWidth={2.25} />
            </a>
          </div>
        </div>

        <div ref={listRef} className='mt-8 lg:mt-0 lg:pb-24'>
          <p data-block className={`pb-10 lg:pb-24 ${answerClassName} ${blockClassName(0)}`}>
            {ABOUT.intro}
          </p>
          {ABOUT.topics.map((topic, index) => (
            <article
              key={topic.id}
              data-block
              className={`border-t border-white/[0.15] py-10 lg:py-16 ${blockClassName(index + 1)}`}
            >
              <h3 className='text-base text-white/[0.55] sm:text-lg'>{topic.question}</h3>
              <p className={`mt-4 ${answerClassName}`}>{topic.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

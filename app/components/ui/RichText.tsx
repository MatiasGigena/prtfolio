'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { EASE_OUT } from '@/app/animations/motion';
import type { RichPhrase, RichTextSegment } from '@/app/types/portfolio';

interface RichTextProps {
  readonly phrases: readonly RichPhrase[];
  readonly variant?: 'body' | 'title';
}

const bodyContainer =
  'pl-4 text-lg xsm:text-xl sm:text-2xl md:text-3xl xsm:px-3 sm:px-4 md:px-6 xl:w-[80rem] xl:px-0 space-y-20';
const titleContainer =
  'px-2 text-lg flex flex-col justify-center items-center xsm:text-xl sm:text-2xl md:text-3xl xsm:px-3 sm:px-4 md:px-6 xl:w-[80rem] xl:px-0 space-y-20';
const bodyHighlight = 'text-white font-bold text-xl xsm:text-2xl sm:text-3xl md:text-4xl';
const titleHighlight =
  'text-white font-bold text-4xl xsm:text-6xl xs:text-[3.5rem] sm:text-8xl md:text-[7rem] lg:text-[9.5rem] xl:text-[12rem] xxl:text-[13rem]';

function renderSegment(
  segment: RichTextSegment,
  index: number,
  highlightClassName: string,
): string | JSX.Element {
  if (typeof segment === 'string') return segment;
  return (
    <span key={`${segment.emphasis}-${index}`} className={highlightClassName}>
      {segment.emphasis}
    </span>
  );
}

export default function RichText({ phrases, variant = 'body' }: RichTextProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const reduceMotion = useReducedMotion();
  const isTitle = variant === 'title';

  return (
    <div ref={ref} className={isTitle ? titleContainer : bodyContainer}>
      {phrases.map((phrase, index) => (
        <div
          key={index}
          className={
            isTitle ? 'overflow-hidden lg:h-52 flex items-center' : 'overflow-hidden lg:min-h-12'
          }
        >
          <motion.p
            initial={{ opacity: 0, transform: reduceMotion ? 'none' : 'translate3d(0, 100%, 0)' }}
            animate={
              isInView
                ? { opacity: 1, transform: 'none' }
                : {
                    opacity: 0,
                    transform: reduceMotion ? 'none' : 'translate3d(0, 100%, 0)',
                  }
            }
            transition={{
              duration: reduceMotion ? 0.2 : 0.45,
              delay: reduceMotion ? 0 : index * 0.055,
              ease: EASE_OUT,
            }}
            className='m-0 w-fit font-normal'
          >
            {phrase.map((segment, segmentIndex) =>
              renderSegment(segment, segmentIndex, isTitle ? titleHighlight : bodyHighlight),
            )}
          </motion.p>
        </div>
      ))}
    </div>
  );
}

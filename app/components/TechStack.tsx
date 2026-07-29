'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { TECH_COLUMNS } from '@/app/data/portfolio';
import useViewportSize from '@/hooks/useViewportSize';

interface ColumnProps {
  readonly images: readonly string[];
  readonly multiplier: number;
  readonly scrollProgress: MotionValue<number>;
  readonly viewportHeight: number;
  readonly reduceMotion: boolean | null;
}

function Column({
  images,
  multiplier,
  scrollProgress,
  viewportHeight,
  reduceMotion,
}: ColumnProps): JSX.Element {
  const transform = useTransform(scrollProgress, (progress) =>
    reduceMotion
      ? 'translate3d(0, 0px, 0)'
      : `translate3d(0, ${progress * viewportHeight * multiplier}px, 0)`,
  );

  return (
    <motion.div
      style={{ transform }}
      className='tech-column w-1/3 h-full relative flex flex-col gap-[2vw] min-w-[100px] sm:min-w-[250px] will-change-transform'
    >
      {images.map((src) => (
        <div key={src} className='h-full grid place-items-center w-full relative'>
          <Image
            src={src}
            height={100}
            width={100}
            alt='Technology logo'
            className='h-[100px] w-[100px] object-contain'
          />
        </div>
      ))}
    </motion.div>
  );
}

export default function TechStack(): JSX.Element {
  const { height } = useViewportSize();
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      className='min-h-screen w-full bg-white text-sec flex flex-col justify-center items-center'
      aria-label='Technology gallery'
    >
      <div ref={ref} className='h-[calc(var(--screen-h)*1.7)] flex overflow-hidden gap-[6vw] p-[2vw] box-border'>
        {TECH_COLUMNS.map((column) => (
          <Column
            key={column.id}
            images={column.images}
            multiplier={column.multiplier}
            scrollProgress={scrollYProgress}
            viewportHeight={height}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </section>
  );
}

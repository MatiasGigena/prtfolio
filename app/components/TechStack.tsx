'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionStyle, type MotionValue } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { DARK_LOGO_SOURCES, TECH_COLUMNS } from '@/app/data/portfolio';
import useViewportSize from '@/hooks/useViewportSize';

interface ColumnProps {
  readonly images: readonly string[];
  readonly multiplier: number;
  readonly scrollProgress: MotionValue<number>;
  readonly viewportHeight: number;
  readonly reduceMotion: boolean | null;
  readonly scrollDriven: boolean;
}

// Browsers with scroll-driven animations run the parallax on the compositor,
// in step with native scrolling. Driving it from JS lags a frame behind on
// mobile touch scrolling, which makes the columns jitter.
function supportsScrollDrivenAnimations(): boolean {
  return typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()');
}

function Column({
  images,
  multiplier,
  scrollProgress,
  viewportHeight,
  reduceMotion,
  scrollDriven,
}: ColumnProps): JSX.Element {
  const transform = useTransform(scrollProgress, (progress) =>
    reduceMotion
      ? 'translate3d(0, 0px, 0)'
      : `translate3d(0, ${progress * viewportHeight * multiplier}px, 0)`,
  );

  return (
    <motion.div
      style={
        scrollDriven
          ? ({ '--tech-parallax': multiplier } as MotionStyle)
          : { transform }
      }
      className='tech-column w-1/3 h-full relative flex flex-col gap-[2vw] min-w-[64px] xs:min-w-[100px] sm:min-w-[250px] will-change-transform'
    >
      {images.map((src) => (
        <div key={src} className='h-full grid place-items-center w-full relative'>
          <Image
            src={src}
            height={100}
            width={100}
            alt='Technology logo'
            className={`h-16 w-16 object-contain xs:h-[100px] xs:w-[100px] ${DARK_LOGO_SOURCES.has(src) ? 'invert hue-rotate-180' : ''}`}
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
  const [scrollDriven, setScrollDriven] = useState(false);
  useEffect(() => setScrollDriven(supportsScrollDrivenAnimations()), []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      className='min-h-screen w-full bg-black text-sec flex flex-col justify-center items-center'
      aria-label='Technology gallery'
    >
      <div
        ref={ref}
        className={`tech-gallery h-[calc(var(--screen-h)*1.7)] flex overflow-hidden gap-[6vw] p-[2vw] box-border ${scrollDriven ? 'is-scroll-driven' : ''}`}
      >
        {TECH_COLUMNS.map((column) => (
          <Column
            key={column.id}
            images={column.images}
            multiplier={column.multiplier}
            scrollProgress={scrollYProgress}
            viewportHeight={height}
            reduceMotion={reduceMotion}
            scrollDriven={scrollDriven}
          />
        ))}
      </div>
    </section>
  );
}

'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionStyle, type MotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { TECH_LOGOS } from '@/app/data/portfolio';
import type { TechLogo } from '@/app/types/portfolio';
import useViewportSize from '@/hooks/useViewportSize';
import TechLogoImage from './ui/TechLogoImage';

interface TechColumn {
  readonly id: string;
  /** Viewport heights the column travels while the gallery scrolls past; columns differ to create depth. */
  readonly multiplier: number;
  readonly logos: readonly TechLogo[];
}

const TECH_COLUMNS: readonly TechColumn[] = [
  {
    id: 'left',
    multiplier: 2,
    logos: [
      TECH_LOGOS.javascript,
      TECH_LOGOS.typescript,
      TECH_LOGOS.wordpress,
      TECH_LOGOS.github,
      TECH_LOGOS.materialUi,
      TECH_LOGOS.react,
      TECH_LOGOS.redux,
      TECH_LOGOS.nextjs,
    ],
  },
  {
    id: 'center',
    multiplier: 2.3,
    logos: [
      TECH_LOGOS.express,
      TECH_LOGOS.sequelize,
      TECH_LOGOS.html,
      TECH_LOGOS.css,
      TECH_LOGOS.framer,
      TECH_LOGOS.nodejs,
      TECH_LOGOS.tailwind,
      TECH_LOGOS.postgresql,
    ],
  },
  {
    id: 'right',
    multiplier: 2.5,
    logos: [
      TECH_LOGOS.postman,
      TECH_LOGOS.git,
      TECH_LOGOS.gsap,
      TECH_LOGOS.aws,
      TECH_LOGOS.react,
      TECH_LOGOS.docker,
      TECH_LOGOS.neptune,
      TECH_LOGOS.gremlin,
    ],
  },
];

interface ColumnProps {
  readonly logos: readonly TechLogo[];
  readonly multiplier: number;
  readonly scrollProgress: MotionValue<number>;
  readonly viewportHeight: number;
  readonly mode: ParallaxMode;
}

// 'scroll-driven' runs the parallax on the compositor, in step with native
// scrolling. Driving it from JS ('js') lags a frame behind on touch scrolling
// and makes the columns jitter, so touch devices without scroll-driven
// animations (iOS < 26, Firefox for Android) get no parallax ('static').
type ParallaxMode = 'scroll-driven' | 'js' | 'static';

function getParallaxMode(reduceMotion: boolean | null): ParallaxMode {
  if (reduceMotion) return 'static';
  if (CSS.supports('animation-timeline: view()')) return 'scroll-driven';
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches ? 'static' : 'js';
}

function Column({
  logos,
  multiplier,
  scrollProgress,
  viewportHeight,
  mode,
}: ColumnProps): JSX.Element {
  const transform = useTransform(
    scrollProgress,
    (progress) => `translate3d(0, ${progress * viewportHeight * multiplier}px, 0)`,
  );
  const style: MotionStyle =
    mode === 'js'
      ? { transform }
      : mode === 'scroll-driven'
        ? ({ '--tech-parallax': multiplier } as MotionStyle)
        : {};

  return (
    <motion.div
      style={style}
      className='tech-column w-1/3 h-full relative flex flex-col gap-[2vw] min-w-[64px] xs:min-w-[100px] sm:min-w-[250px] will-change-transform'
    >
      {logos.map((logo) => (
        <div key={logo.name} className='h-full grid place-items-center w-full relative'>
          <TechLogoImage logo={logo} size={100} className='h-16 w-16 xs:h-[100px] xs:w-[100px]' />
        </div>
      ))}
    </motion.div>
  );
}

export default function TechGallery(): JSX.Element {
  const { height } = useViewportSize();
  const galleryRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<ParallaxMode>('js');
  useEffect(() => setMode(getParallaxMode(reduceMotion)), [reduceMotion]);
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      className='min-h-screen w-full bg-black text-white flex flex-col justify-center items-center'
      aria-label='Technology gallery'
    >
      <div
        ref={galleryRef}
        className={`tech-gallery h-[calc(var(--screen-h)*1.7)] flex overflow-hidden gap-[6vw] p-[2vw] box-border ${mode === 'scroll-driven' ? 'is-scroll-driven' : ''} ${mode === 'static' ? 'is-static' : ''}`}
      >
        {TECH_COLUMNS.map((column) => (
          <Column
            key={column.id}
            logos={column.logos}
            multiplier={column.multiplier}
            scrollProgress={scrollYProgress}
            viewportHeight={height}
            mode={mode}
          />
        ))}
      </div>
    </section>
  );
}

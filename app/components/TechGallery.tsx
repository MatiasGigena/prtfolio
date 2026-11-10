'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type JSX } from 'react';
import { ensureScrollTrigger, gsap } from '@/app/animations/gsap';
import { COARSE_POINTER_QUERY } from '@/app/animations/motion';
import { TECH_LOGOS } from '@/app/data/portfolio';
import type { TechLogo } from '@/app/types/portfolio';
import TechLogoImage from './ui/TechLogoImage';

interface TechColumn {
  readonly id: string;
  /** How far above the gallery the column starts, so its logos travel through view. */
  readonly offset: string;
  /** Viewport heights the column travels while the gallery scrolls past; columns differ to create depth. */
  readonly multiplier: number;
  readonly logos: readonly TechLogo[];
}

const TECH_COLUMNS: readonly TechColumn[] = [
  {
    id: 'left',
    offset: '-55%',
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
    offset: '-78%',
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
    offset: '-75%',
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

// 'scroll-driven' runs the parallax on the compositor, in step with native
// scrolling. Driving it from JS ('js') lags a frame behind on touch scrolling
// and makes the columns jitter, so touch devices without scroll-driven
// animations (iOS < 26, Firefox for Android) get no parallax ('static').
type ParallaxMode = 'scroll-driven' | 'js' | 'static';

function getParallaxMode(reduceMotion: boolean | null): ParallaxMode {
  if (reduceMotion) return 'static';
  if (CSS.supports('animation-timeline: view()')) return 'scroll-driven';
  return window.matchMedia(COARSE_POINTER_QUERY).matches ? 'static' : 'js';
}

interface ParallaxColumn {
  readonly element: HTMLElement;
  readonly multiplier: number;
}

/**
 * The JS fallback for the parallax: the same motion as the CSS scroll-driven version, where
 * each column moves down by its multiplier times the viewport height while the gallery crosses
 * the screen. Returns a function that removes it.
 */
function scrubColumns(gallery: HTMLElement, columns: readonly ParallaxColumn[]): () => void {
  ensureScrollTrigger();
  const tweens = columns.map(({ element, multiplier }) =>
    gsap.to(element, {
      y: () => window.innerHeight * multiplier,
      ease: 'none',
      scrollTrigger: {
        trigger: gallery,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    }),
  );
  return () => {
    for (const tween of tweens) tween.revert();
  };
}

export default function TechGallery(): JSX.Element {
  const galleryRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(ParallaxColumn | null)[]>([]);
  const reduceMotion = useReducedMotion();
  // Unknown until mounted, because it depends on browser support and the pointer type.
  const [mode, setMode] = useState<ParallaxMode | null>(null);

  useEffect(() => setMode(getParallaxMode(reduceMotion)), [reduceMotion]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (mode !== 'js' || !gallery) return;
    const columns = columnsRef.current.filter((column): column is ParallaxColumn => column !== null);
    return scrubColumns(gallery, columns);
  }, [mode]);

  return (
    <section
      className='min-h-screen w-full bg-black text-white flex flex-col justify-center items-center'
      aria-label='Technology gallery'
    >
      <div
        ref={galleryRef}
        data-parallax={mode ?? undefined}
        className='tech-gallery h-[calc(var(--screen-h)*1.7)] flex overflow-hidden gap-[6vw] p-[2vw] box-border'
      >
        {TECH_COLUMNS.map((column, index) => (
          <div
            key={column.id}
            ref={(element) => {
              columnsRef.current[index] = element && { element, multiplier: column.multiplier };
            }}
            // Without parallax the columns sit at the top so every logo is visible.
            style={{ '--tech-parallax': column.multiplier, top: mode === 'static' ? 0 : column.offset }}
            className='tech-column w-1/3 h-full relative flex flex-col gap-[2vw] min-w-[64px] xs:min-w-[100px] sm:min-w-[250px] will-change-transform'
          >
            {column.logos.map((logo) => (
              <div key={logo.name} className='h-full grid place-items-center w-full relative'>
                <TechLogoImage logo={logo} size={100} className='h-16 w-16 xs:h-[100px] xs:w-[100px]' />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

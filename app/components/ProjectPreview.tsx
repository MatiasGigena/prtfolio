'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { forwardRef, useEffect, useRef, type ReactNode } from 'react';
import { createFollower, gsap } from '@/app/animations/gsap';
import { EASE_OUT, hasFinePointer } from '@/app/animations/motion';
import type { PortfolioProject } from '@/app/types/portfolio';

interface ProjectPreviewProps {
  /** Index into `projects` of the link under the pointer, or null when none is hovered. */
  readonly activeIndex: number | null;
  readonly projects: readonly PortfolioProject[];
}

type LayerState = 'hidden' | 'visible';

const previewVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.18, ease: EASE_OUT },
  },
};

// Seconds each layer takes to catch up with the pointer: the label leads and the image trails.
const IMAGE_FOLLOW_DURATION = 0.32;
const CURSOR_FOLLOW_DURATION = 0.2;
const LABEL_FOLLOW_DURATION = 0.16;

export default function ProjectPreview({
  activeIndex,
  projects,
}: ProjectPreviewProps): JSX.Element {
  const imageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !hasFinePointer()) return;

    const layers = [
      { element: imageRef.current, duration: IMAGE_FOLLOW_DURATION },
      { element: cursorRef.current, duration: CURSOR_FOLLOW_DURATION },
      { element: labelRef.current, duration: LABEL_FOLLOW_DURATION },
    ];
    const elements = layers.flatMap(({ element }) => (element ? [element] : []));
    const followers = layers.flatMap(({ element, duration }) =>
      element ? [createFollower(element, duration)] : [],
    );
    // Centre each layer on the pointer rather than hanging it off the top-left corner.
    gsap.set(elements, { xPercent: -50, yPercent: -50 });

    const move = (event: PointerEvent): void => {
      for (const follow of followers) follow(event.clientX, event.clientY);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      gsap.killTweensOf(elements);
    };
  }, [reduceMotion]);

  const state: LayerState = activeIndex !== null && !reduceMotion ? 'visible' : 'hidden';

  return (
    <div className='project-preview' aria-hidden='true'>
      <FollowerLayer
        ref={imageRef}
        state={state}
        className='h-[200px] w-[250px] sm:h-[350px] sm:w-[400px] overflow-hidden'
      >
        <div
          className='preview-track h-full w-full'
          style={{ transform: `translate3d(0, ${(activeIndex ?? 0) * -100}%, 0)` }}
        >
          {projects.map((project) => (
            <div key={project.title} className='relative h-full w-full flex items-center justify-center'>
              <Image
                src={project.image}
                width={390}
                height={293}
                alt=''
                className='object-contain rounded-2xl'
                style={{ height: 'auto', width: '100%' }}
                sizes='(max-width: 640px) 250px, 390px'
              />
            </div>
          ))}
        </div>
      </FollowerLayer>
      <FollowerLayer
        ref={cursorRef}
        state={state}
        className='w-24 h-24 bg-black shadow-xl rounded-full text-white'
      />
      <FollowerLayer
        ref={labelRef}
        state={state}
        className='w-24 h-24 text-xl font-extralight flex items-center justify-center text-white'
      >
        Let&apos;s go!
      </FollowerLayer>
    </div>
  );
}

interface FollowerLayerProps {
  readonly state: LayerState;
  readonly className: string;
  readonly children?: ReactNode;
}

/** A fixed, click-through layer that the pointer drags around; its content fades and scales in. */
const FollowerLayer = forwardRef<HTMLDivElement, FollowerLayerProps>(function FollowerLayer(
  { state, className, children },
  ref,
) {
  return (
    <div ref={ref} className='fixed left-0 top-0 pointer-events-none z-30'>
      <motion.div variants={previewVariants} initial='hidden' animate={state} className={className}>
        {children}
      </motion.div>
    </div>
  );
});

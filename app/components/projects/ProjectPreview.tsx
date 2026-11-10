'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { forwardRef, useEffect, useRef, useState, type JSX, type ReactNode } from 'react';
import { createFollower, gsap } from '@/app/animations/gsap';
import { EASE_OUT, FINE_POINTER_QUERY } from '@/app/animations/motion';
import type { PortfolioProject } from '@/app/types/portfolio';

interface ProjectPreviewProps {
  /** Index into `projects` of the screenshot to show; kept while the preview fades out. */
  readonly index: number;
  readonly visible: boolean;
  readonly projects: readonly PortfolioProject[];
}

type LayerState = 'hidden' | 'visible';

const PREVIEW_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.18, ease: EASE_OUT },
  },
};

// Seconds each layer takes to catch up with the pointer: the label leads and the image trails.
const IMAGE_FOLLOW_DURATION = 0.32;
const DISC_FOLLOW_DURATION = 0.2;
const LABEL_FOLLOW_DURATION = 0.16;

interface PointerFollowTarget {
  readonly element: HTMLElement;
  readonly duration: number;
}

/** Centres each target on the pointer and makes it trail the pointer around the window. */
function followPointer(targets: readonly PointerFollowTarget[]): () => void {
  const elements = targets.map(({ element }) => element);
  const followers = targets.map(({ element, duration }) => createFollower(element, duration));
  gsap.set(elements, { xPercent: -50, yPercent: -50 });

  const move = (event: PointerEvent): void => {
    if (event.pointerType !== 'mouse') return;
    for (const follow of followers) follow(event.clientX, event.clientY);
  };
  window.addEventListener('pointermove', move, { passive: true });
  return () => {
    window.removeEventListener('pointermove', move);
    gsap.killTweensOf(elements);
  };
}

/**
 * A screenshot, a dark disc and a label that trail a mouse over the project list. It only
 * appears where it can follow the pointer, so it never shows up parked in a corner.
 */
export default function ProjectPreview({ index, visible, projects }: ProjectPreviewProps): JSX.Element {
  const imageRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    const disc = discRef.current;
    const label = labelRef.current;
    if (reduceMotion || !window.matchMedia(FINE_POINTER_QUERY).matches || !image || !disc || !label) return;

    const stopFollowing = followPointer([
      { element: image, duration: IMAGE_FOLLOW_DURATION },
      { element: disc, duration: DISC_FOLLOW_DURATION },
      { element: label, duration: LABEL_FOLLOW_DURATION },
    ]);
    setFollowing(true);
    return () => {
      stopFollowing();
      setFollowing(false);
    };
  }, [reduceMotion]);

  const state: LayerState = visible && following ? 'visible' : 'hidden';

  return (
    <div className='project-preview' aria-hidden='true'>
      <FollowerLayer
        ref={imageRef}
        state={state}
        className='h-[200px] w-[250px] sm:h-[350px] sm:w-[400px] overflow-hidden'
      >
        <div
          className='preview-track h-full w-full'
          style={{ transform: `translate3d(0, ${index * -100}%, 0)` }}
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
        ref={discRef}
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
    <div ref={ref} data-state={state} className='fixed left-0 top-0 pointer-events-none z-30'>
      <motion.div variants={PREVIEW_VARIANTS} initial='hidden' animate={state} className={className}>
        {children}
      </motion.div>
    </div>
  );
});

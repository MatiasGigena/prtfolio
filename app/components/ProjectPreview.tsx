'use client';

import { gsap } from 'gsap';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { PortfolioProject, ProjectPreviewState } from '@/app/types/portfolio';
import { EASE_OUT } from '@/app/animations/motion';

interface ProjectPreviewProps {
  readonly activeIndex: ProjectPreviewState;
  readonly projects: readonly PortfolioProject[];
}

const previewVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.18, ease: EASE_OUT },
  },
};

export default function ProjectPreview({
  activeIndex,
  projects,
}: ProjectPreviewProps): JSX.Element {
  const imageFollower = useRef<HTMLDivElement>(null);
  const cursorFollower = useRef<HTMLDivElement>(null);
  const labelFollower = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const image = imageFollower.current;
    const cursor = cursorFollower.current;
    const label = labelFollower.current;
    if (!image || !cursor || !label) return;
    const followers = [image, cursor, label];
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches || reduceMotion) return;

    gsap.set(followers, { xPercent: -50, yPercent: -50 });
    const imageX = gsap.quickTo(image, 'x', { duration: 0.32, ease: 'power3.out' });
    const imageY = gsap.quickTo(image, 'y', { duration: 0.32, ease: 'power3.out' });
    const cursorX = gsap.quickTo(cursor, 'x', { duration: 0.2, ease: 'power3.out' });
    const cursorY = gsap.quickTo(cursor, 'y', { duration: 0.2, ease: 'power3.out' });
    const labelX = gsap.quickTo(label, 'x', { duration: 0.16, ease: 'power3.out' });
    const labelY = gsap.quickTo(label, 'y', { duration: 0.16, ease: 'power3.out' });

    const move = (event: PointerEvent): void => {
      imageX(event.clientX);
      imageY(event.clientY);
      cursorX(event.clientX);
      cursorY(event.clientY);
      labelX(event.clientX);
      labelY(event.clientY);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      gsap.killTweensOf(followers);
    };
  }, [reduceMotion]);

  const state = activeIndex !== null && !reduceMotion ? 'visible' : 'hidden';

  return (
    <div className='project-preview' aria-hidden='true'>
      <div ref={imageFollower} className='fixed left-0 top-0 pointer-events-none z-30'>
        <motion.div
          variants={previewVariants}
          initial='hidden'
          animate={state}
          className='h-[200px] w-[250px] sm:h-[350px] sm:w-[400px] overflow-hidden'
        >
          <div
            className='preview-track h-full w-full'
            style={{ transform: `translate3d(0, ${(activeIndex ?? 0) * -100}%, 0)` }}
          >
            {projects.map((project) => (
              <div
                key={project.title}
                className='relative h-full w-full flex items-center justify-center'
                style={{ position: 'relative', height: '100%', width: '100%' }}
              >
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
        </motion.div>
      </div>

      <div ref={cursorFollower} className='fixed left-0 top-0 pointer-events-none z-30'>
        <motion.div
          variants={previewVariants}
          initial='hidden'
          animate={state}
          className='w-24 h-24 bg-black shadow-xl rounded-full text-sec'
        />
      </div>
      <div ref={labelFollower} className='fixed left-0 top-0 pointer-events-none z-30'>
        <motion.div
          variants={previewVariants}
          initial='hidden'
          animate={state}
          className='w-24 h-24 text-xl font-extralight flex items-center justify-center text-sec'
        >
          Let&apos;s go!
        </motion.div>
      </div>
    </div>
  );
}

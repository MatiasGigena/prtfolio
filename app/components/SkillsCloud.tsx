'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, type JSX } from 'react';
import { createFollower, gsap, type Follower } from '@/app/animations/gsap';
import { FINE_POINTER_QUERY } from '@/app/animations/motion';
import { TECH_LOGOS } from '@/app/data/portfolio';
import type { TechLogo } from '@/app/types/portfolio';
import TechLogoImage from './ui/TechLogoImage';

/** Pixels a plane of strength 1 travels as the pointer crosses the section from edge to edge. */
const POINTER_TRAVEL_PX = 42;
const FOLLOW_DURATION = 0.5;

interface PlacedLogo {
  readonly logo: TechLogo;
  /** Tailwind classes that position the logo inside its plane. */
  readonly position: string;
}

interface SkillPlane {
  readonly id: string;
  /** How far the plane follows the pointer; nearer planes move more, which gives the depth. */
  readonly strength: number;
  readonly logos: readonly PlacedLogo[];
}

// Ordered from the farthest plane to the nearest, so nearer logos also paint on top.
const SKILL_PLANES: readonly SkillPlane[] = [
  {
    id: 'far',
    strength: 0.25,
    logos: [
      { logo: TECH_LOGOS.materialUi, position: 'left-[70%] top-[73%]' },
      { logo: TECH_LOGOS.react, position: 'left-[40%] top-[75%]' },
      { logo: TECH_LOGOS.framer, position: 'left-[65%] top-[85%]' },
      { logo: TECH_LOGOS.neptune, position: 'left-[12%] top-[22%] lg:left-[10%] lg:top-[20%]' },
      { logo: TECH_LOGOS.gremlin, position: 'left-[88%] top-[30%]' },
    ],
  },
  {
    id: 'middle',
    strength: 0.4,
    logos: [
      { logo: TECH_LOGOS.javascript, position: 'left-[8%] top-[70%]' },
      { logo: TECH_LOGOS.typescript, position: 'left-[5%] top-[55%]' },
      { logo: TECH_LOGOS.wordpress, position: 'left-[60%] top-0' },
      { logo: TECH_LOGOS.aws, position: 'left-[85%] top-[18%]' },
    ],
  },
  {
    id: 'near',
    strength: 0.5,
    logos: [
      { logo: TECH_LOGOS.github, position: 'left-[5%] top-[12%] lg:top-[8%]' },
      { logo: TECH_LOGOS.html, position: 'left-[100%] top-[58%] sm:left-[80%] sm:top-[51%]' },
      { logo: TECH_LOGOS.css, position: 'left-[65%] top-[60%]' },
      { logo: TECH_LOGOS.docker, position: 'left-[35%] top-[40%]' },
    ],
  },
  {
    id: 'nearest',
    strength: 0.6,
    logos: [
      { logo: TECH_LOGOS.gsap, position: 'left-[20%] top-[80%]' },
      { logo: TECH_LOGOS.redux, position: 'left-[15%] top-[32%]' },
      { logo: TECH_LOGOS.nextjs, position: 'left-[81%] top-[2.5%]' },
      { logo: TECH_LOGOS.nodejs, position: 'left-[63%] top-[18%]' },
      { logo: TECH_LOGOS.express, position: 'left-[33%] top-[18%] lg:left-[29%]' },
      { logo: TECH_LOGOS.sequelize, position: 'right-[18%] top-[33%] sm:right-[22%] lg:right-[13%]' },
      { logo: TECH_LOGOS.tailwind, position: 'left-[35%] top-[60%]' },
      { logo: TECH_LOGOS.postgresql, position: 'left-[40%] top-[2%]' },
      { logo: TECH_LOGOS.postman, position: 'left-[15%] top-[2%]' },
      { logo: TECH_LOGOS.git, position: 'right-[40%] top-[30%]' },
    ],
  },
];

interface DepthPlane {
  readonly element: HTMLElement;
  readonly strength: number;
}

/** Moves every plane toward the same pointer offset, each scaled by its strength. */
function createDepthFollower(planes: readonly DepthPlane[]): Follower {
  const followers = planes.map(({ element, strength }) => ({
    follow: createFollower(element, FOLLOW_DURATION),
    strength,
  }));
  return (x, y) => {
    for (const { follow, strength } of followers) follow(x * strength, y * strength);
  };
}

/** Lets the planes drift toward a mouse moving over `section`. */
function followPointerInDepth(section: HTMLElement, planes: readonly DepthPlane[]): () => void {
  const follow = createDepthFollower(planes);
  const handlePointerMove = (event: PointerEvent): void => {
    if (event.pointerType !== 'mouse') return;
    const rect = section.getBoundingClientRect();
    follow(
      ((event.clientX - rect.left) / rect.width - 0.5) * POINTER_TRAVEL_PX,
      ((event.clientY - rect.top) / rect.height - 0.5) * POINTER_TRAVEL_PX,
    );
  };
  const reset = (): void => follow(0, 0);

  section.addEventListener('pointermove', handlePointerMove);
  section.addEventListener('pointerleave', reset);
  return () => {
    section.removeEventListener('pointermove', handlePointerMove);
    section.removeEventListener('pointerleave', reset);
    gsap.killTweensOf(planes.map(({ element }) => element));
  };
}

export default function SkillsCloud(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const planesRef = useRef<(DepthPlane | null)[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduceMotion || !window.matchMedia(FINE_POINTER_QUERY).matches) return;
    const planes = planesRef.current.filter((plane): plane is DepthPlane => plane !== null);
    return followPointerInDepth(section, planes);
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className='h-screen relative w-full mt-28 overflow-hidden text-white'
      aria-labelledby='skills-heading'
    >
      {SKILL_PLANES.map((plane, planeIndex) => (
        <div
          key={plane.id}
          ref={(element) => {
            planesRef.current[planeIndex] = element && { element, strength: plane.strength };
          }}
          className='absolute inset-0 will-change-transform'
          aria-hidden='true'
        >
          {/* Inset by one logo size so percentage positions keep every logo on screen. */}
          <div className='absolute left-3 top-3 bottom-[calc(36px+0.75rem)] right-[calc(36px+0.75rem)] sm:left-0 sm:top-0 sm:bottom-[70px] sm:right-[70px]'>
            {plane.logos.map(({ logo, position }) => (
              <TechLogoImage
                key={logo.name}
                logo={logo}
                size={70}
                className={`absolute h-9 w-9 sm:h-[70px] sm:w-[70px] ${position}`}
              />
            ))}
          </div>
        </div>
      ))}
      <div className='relative z-10 w-full h-full flex flex-col justify-center items-center'>
        <h2 id='skills-heading' className='text-4xl text-white'>
          My tech stack
        </h2>
        <p className='opacity-70 text-white'>Not just front-end.</p>
      </div>
    </section>
  );
}

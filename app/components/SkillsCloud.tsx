'use client';

import { useEffect, useRef, type PointerEvent } from 'react';
import { TECH_LOGOS } from '@/app/data/portfolio';
import type { TechLogo } from '@/app/types/portfolio';
import TechLogoImage from './ui/TechLogoImage';

const SPRING_RESPONSE = 0.12;

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

const SKILL_PLANES: readonly SkillPlane[] = [
  {
    id: 'foreground',
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
    id: 'closest',
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

interface Point {
  x: number;
  y: number;
}

export default function SkillsCloud(): JSX.Element {
  const planeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const target = useRef<Point>({ x: 0, y: 0 });
  const current = useRef<Point>({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  const animate = (): void => {
    current.current.x += (target.current.x - current.current.x) * SPRING_RESPONSE;
    current.current.y += (target.current.y - current.current.y) * SPRING_RESPONSE;

    planeRefs.current.forEach((element, index) => {
      const plane = SKILL_PLANES[index];
      if (!element || !plane) return;
      element.style.transform = `translate3d(${current.current.x * plane.strength}px, ${current.current.y * plane.strength}px, 0)`;
    });

    const settled =
      Math.abs(target.current.x - current.current.x) < 0.1 &&
      Math.abs(target.current.y - current.current.y) < 0.1;
    if (settled) {
      frame.current = null;
      return;
    }
    frame.current = requestAnimationFrame(animate);
  };

  const scheduleAnimation = (): void => {
    if (frame.current === null) frame.current = requestAnimationFrame(animate);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    target.current = {
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 42,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 42,
    };
    scheduleAnimation();
  };

  const reset = (): void => {
    target.current = { x: 0, y: 0 };
    scheduleAnimation();
  };

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      className='h-screen relative w-full mt-28 overflow-hidden text-white'
      aria-labelledby='skills-heading'
    >
      {SKILL_PLANES.map((plane, planeIndex) => (
        <div
          key={plane.id}
          ref={(element) => {
            planeRefs.current[planeIndex] = element;
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

'use client';

import Image from 'next/image';
import { useEffect, useRef, type PointerEvent } from 'react';
import { SKILL_PLANES } from '@/app/data/portfolio';

const SPRING_RESPONSE = 0.12;

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
      className='h-screen relative w-full mt-28 text-black'
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
          {plane.logos.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={70}
              height={70}
              className={`absolute h-[70px] w-[70px] object-contain ${logo.className}`}
            />
          ))}
        </div>
      ))}
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <h2 id='skills-heading' className='text-4xl text-black'>
          My tech stack
        </h2>
        <p className='opacity-70 text-black'>Not just front-end.</p>
      </div>
    </section>
  );
}

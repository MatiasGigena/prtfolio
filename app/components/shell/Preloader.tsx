'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useState, type CSSProperties, type JSX, type PointerEvent } from 'react';
import { EASE_OUT_CSS } from '@/app/animations/motion';
import { AnimationIcon } from '../ui/Icons';

const COLUMN_COUNT = 20;
const HOLD_MS = 2000;
const EXIT_MS = 300;

// The fade-out is a CSS animation that starts at first paint, so the overlay clears even while
// hydration is slow. The unmount timer starts later, at mount, so the node is only removed after
// the fade has finished.
const overlayStyle: CSSProperties = {
  '--preloader-hold': `${HOLD_MS}ms`,
  '--preloader-exit': `${EXIT_MS}ms`,
};

/** Rows of square cells needed to cover the screen, given COLUMN_COUNT columns across it. */
function gridRowCount(): number {
  const cellSize = window.innerWidth / COLUMN_COUNT;
  return Math.ceil(window.innerHeight / cellSize);
}

/** A full-screen greeting with a grid that lights up under the mouse; it removes itself once faded out. */
export default function Preloader(): JSX.Element | null {
  const [rowCount, setRowCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => setRowCount(gridRowCount()), []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setFinished(true), HOLD_MS + EXIT_MS);
    return () => window.clearTimeout(timeout);
  }, []);

  const colorize = (event: PointerEvent<HTMLDivElement>): void => {
    if (event.pointerType !== 'mouse' || reduceMotion) return;
    event.currentTarget.animate(
      [{ backgroundColor: 'rgb(255 255 255)' }, { backgroundColor: 'transparent' }],
      { duration: 300, easing: EASE_OUT_CSS },
    );
  };

  if (finished) return null;

  return (
    <div
      style={overlayStyle}
      className='preloader-overlay fixed inset-0 z-50 flex w-full items-center justify-center bg-black text-white'
    >
      <p className='flex flex-col items-center w-full'>
        <span className='font-bold text-4xl mr-2'>Get creative!</span>
        <span className='flex text-2xl font-thin gap-3'>
          Matias Gigena
          <AnimationIcon className='preloader-icon' size={32} />
        </span>
      </p>
      <div className='absolute w-full h-full flex' aria-hidden='true'>
        {Array.from({ length: COLUMN_COUNT }, (_, column) => (
          <div key={column} className='w-[5vw] rounded-2xl h-full'>
            {Array.from({ length: rowCount }, (_, row) => (
              <div key={row} onPointerEnter={colorize} className='w-full rounded-2xl h-[5vw]' />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState, type CSSProperties, type PointerEvent } from 'react';
import { AnimationIcon } from './ui/Icons';

const COLUMN_COUNT = 20;
const HOLD_MS = 2000;
const EXIT_MS = 300;

// Both the fade-out and the unmount are anchored to mount rather than to
// navigation start, so a slow hydration delays the preloader instead of
// eating the window in which its grid is hoverable.
const overlayStyle = {
  '--preloader-hold': `${HOLD_MS}ms`,
  '--preloader-exit': `${EXIT_MS}ms`,
} as CSSProperties;

interface PreloaderProps {
  readonly onFinish: () => void;
}

export default function Preloader({ onFinish }: PreloaderProps): JSX.Element {
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    const blockSize = window.innerWidth * 0.05;
    setRowCount(Math.ceil(window.innerHeight / blockSize));
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(onFinish, HOLD_MS + EXIT_MS);
    return () => window.clearTimeout(timeout);
  }, [onFinish]);

  const colorize = (event: PointerEvent<HTMLDivElement>): void => {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    event.currentTarget.animate(
      [{ backgroundColor: 'rgb(255 255 255)' }, { backgroundColor: 'transparent' }],
      { duration: 300, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
    );
  };

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

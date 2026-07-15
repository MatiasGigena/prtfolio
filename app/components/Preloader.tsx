'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, type PointerEvent } from 'react';
import { preloaderVariants } from '@/app/animations/motion';
import { AnimationIcon } from './ui/Icons';

const COLUMN_COUNT = 20;

export default function Preloader(): JSX.Element {
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    const blockSize = window.innerWidth * 0.05;
    setRowCount(Math.ceil(window.innerHeight / blockSize));
  }, []);

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
    <motion.div
      variants={preloaderVariants}
      initial='visible'
      exit='exit'
      className='min-h-screen fixed w-full bg-black top-0 left-0 z-50 text-white flex items-center justify-center'
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
    </motion.div>
  );
}

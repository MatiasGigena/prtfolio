'use client';

import type { MotionValue } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import type { Book } from '@/app/types/portfolio';
import { getCarouselTransform } from './carouselMath';

interface BookCardProps {
  readonly book: Book;
  readonly index: number;
  readonly angle: MotionValue<number>;
  readonly radius: number;
  readonly slotAngle: number;
}

export default function BookCard({
  book,
  index,
  angle,
  radius,
  slotAngle,
}: BookCardProps): JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);

  const applyTransform = useCallback(
    (currentAngle: number): void => {
      const card = cardRef.current;
      if (!card) return;
      const transform = getCarouselTransform(index, currentAngle, radius, slotAngle);
      card.style.transform = `translate3d(${transform.x}px, 0, ${transform.z}px) rotateY(${transform.rotateY}deg) scale(${transform.scale})`;
      card.style.opacity = String(transform.opacity);
      card.style.zIndex = String(transform.zIndex);
    },
    [index, radius, slotAngle],
  );

  useEffect(() => {
    applyTransform(angle.get());
    return angle.on('change', applyTransform);
  }, [angle, applyTransform]);

  const initial = getCarouselTransform(index, angle.get(), radius, slotAngle);
  return (
    <div
      ref={cardRef}
      className='absolute flex flex-col items-center will-change-transform'
      style={{
        transformStyle: 'preserve-3d',
        transform: `translate3d(${initial.x}px, 0, ${initial.z}px) rotateY(${initial.rotateY}deg) scale(${initial.scale})`,
        opacity: initial.opacity,
        zIndex: initial.zIndex,
      }}
    >
      <div className='book-card w-[100px] h-[150px] sm:w-[130px] sm:h-[190px] md:w-[150px] md:h-[220px] rounded-lg overflow-hidden relative select-none'>
        <Image
          src={book.image}
          alt={book.title}
          width={150}
          height={220}
          className='h-full w-full object-cover rounded-lg pointer-events-none'
          style={{ height: '100%', width: '100%' }}
          draggable={false}
          sizes='(max-width: 640px) 100px, (max-width: 768px) 130px, 150px'
        />
        <div className='absolute inset-0 rounded-lg pointer-events-none z-50 bg-black/10' />
      </div>
    </div>
  );
}

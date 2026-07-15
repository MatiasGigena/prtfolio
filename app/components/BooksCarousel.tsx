'use client';

import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  type AnimationPlaybackControls,
} from 'framer-motion';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import { BOOKS } from '@/app/data/portfolio';
import BookCard from './books/BookCard';
import { normalizeIndex, projectVelocity } from './books/carouselMath';

const ITEM_COUNT = BOOKS.length;
const SLOT_ANGLE = 360 / ITEM_COUNT;
const AUTO_ROTATE_INTERVAL = 3000;
const DRAG_SENSITIVITY = 0.3;

interface PointerSample {
  readonly x: number;
  readonly time: number;
}

function radiusForWidth(width: number): number {
  if (width >= 1024) return 420;
  if (width >= 640) return 300;
  return 200;
}

export default function BooksCarousel(): JSX.Element {
  const angle = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [radius, setRadius] = useState(300);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: '-10%' });
  const reduceMotion = useReducedMotion();
  const isDragging = useRef(false);
  const pointerSamples = useRef<PointerSample[]>([]);
  const animation = useRef<AnimationPlaybackControls | null>(null);
  const autoRotateTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAutoRotate = useCallback((): void => {
    if (autoRotateTimer.current !== null) clearInterval(autoRotateTimer.current);
    autoRotateTimer.current = null;
  }, []);

  const rotateToSlot = useCallback(
    (slot: number, velocity = 0, immediate = false): void => {
      const target = slot * SLOT_ANGLE;
      animation.current?.stop();
      if (immediate || reduceMotion) {
        angle.set(target);
      } else {
        animation.current = animate(angle, target, {
          type: 'spring',
          duration: 0.4,
          bounce: velocity === 0 ? 0 : 0.18,
          velocity,
        });
      }
      setActiveIndex(normalizeIndex(slot, ITEM_COUNT));
    },
    [angle, reduceMotion],
  );

  const rotateToNext = useCallback((): void => {
    const nextSlot = Math.round(angle.get() / SLOT_ANGLE) + 1;
    rotateToSlot(nextSlot);
  }, [angle, rotateToSlot]);

  const startAutoRotate = useCallback((): void => {
    stopAutoRotate();
    if (!isInView || reduceMotion || document.hidden) return;
    autoRotateTimer.current = setInterval(() => {
      if (!isDragging.current) rotateToNext();
    }, AUTO_ROTATE_INTERVAL);
  }, [isInView, reduceMotion, rotateToNext, stopAutoRotate]);

  useEffect(() => {
    const updateRadius = (): void => setRadius(radiusForWidth(window.innerWidth));
    updateRadius();
    window.addEventListener('resize', updateRadius, { passive: true });
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  useEffect(() => {
    const handleVisibility = (): void => {
      if (document.hidden) stopAutoRotate();
      else startAutoRotate();
    };
    startAutoRotate();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      stopAutoRotate();
    };
  }, [startAutoRotate, stopAutoRotate]);

  useEffect(() => () => animation.current?.stop(), []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    if (isDragging.current) return;
    isDragging.current = true;
    animation.current?.stop();
    stopAutoRotate();
    pointerSamples.current = [{ x: event.clientX, time: performance.now() }];
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (!isDragging.current) return;
    const samples = pointerSamples.current;
    const previous = samples.at(-1);
    if (!previous) return;
    angle.set(angle.get() + (event.clientX - previous.x) * DRAG_SENSITIVITY);
    const now = performance.now();
    pointerSamples.current = [...samples, { x: event.clientX, time: now }].filter(
      (sample) => now - sample.time <= 100,
    );
  };

  const finishDrag = (): void => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const samples = pointerSamples.current;
    const first = samples[0];
    const last = samples.at(-1);
    const elapsed = first && last ? Math.max(last.time - first.time, 1) : 1;
    const pointerVelocity = first && last ? (last.x - first.x) / (elapsed / 1000) : 0;
    const angularVelocity = pointerVelocity * DRAG_SENSITIVITY;
    const projectedAngle = angle.get() + projectVelocity(angularVelocity);
    rotateToSlot(Math.round(projectedAngle / SLOT_ANGLE), angularVelocity);
    startAutoRotate();
  };

  const goToIndex = (index: number): void => {
    const currentSlot = Math.round(angle.get() / SLOT_ANGLE);
    const currentIndex = normalizeIndex(currentSlot, ITEM_COUNT);
    let delta = index - currentIndex;
    if (delta > ITEM_COUNT / 2) delta -= ITEM_COUNT;
    if (delta < -ITEM_COUNT / 2) delta += ITEM_COUNT;
    rotateToSlot(currentSlot + delta);
    startAutoRotate();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    rotateToSlot(Math.round(angle.get() / SLOT_ANGLE) + direction, 0, true);
  };

  return (
    <section
      ref={sectionRef}
      className='min-h-screen w-full bg-black flex flex-col justify-center items-center py-20 md:py-32 overflow-hidden relative'
      aria-labelledby='books-heading'
    >
      <div className='text-center mb-16 md:mb-24'>
        <h2 id='books-heading' className='text-4xl sm:text-5xl md:text-6xl font-light text-white'>
          Books I&apos;ve <span className='font-bold'>Read.</span>
        </h2>
        <p className='text-white/50 mt-4 text-sm sm:text-base'>Knowledge that shaped my thinking</p>
      </div>

      <div
        className='relative h-[300px] sm:h-[350px] md:h-[400px] w-full cursor-grab active:cursor-grabbing select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white'
        style={{ perspective: '1200px', touchAction: 'pan-y' }}
        role='region'
        aria-label='Book carousel. Use left and right arrow keys to navigate.'
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        <div
          className='absolute inset-0 flex items-center justify-center'
          style={{ transformStyle: 'preserve-3d' }}
        >
          {BOOKS.map((book, index) => (
            <BookCard
              key={book.id}
              book={book}
              index={index}
              angle={angle}
              radius={radius}
              slotAngle={SLOT_ANGLE}
            />
          ))}
        </div>
      </div>

      <div className='flex justify-center gap-2 absolute bottom-10 left-0 right-0'>
        {BOOKS.map((book, index) => (
          <button
            key={book.id}
            type='button'
            onClick={() => goToIndex(index)}
            aria-label={`Show ${book.title}`}
            aria-current={index === activeIndex}
            className={`carousel-dot pressable h-2 w-6 rounded-full ${index === activeIndex ? 'is-active bg-white' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </section>
  );
}

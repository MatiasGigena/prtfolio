'use client';
import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  useMotionValue,
  animate,
  useInView,
} from 'framer-motion';
import Image from 'next/image';

const BOOKS = [
  {
    id: 1,
    title: 'Clean Code',
    src: '/images/cleancode.avif',
  },
  {
    id: 2,
    title: 'The Pragmatic Programmer',
    src: '/images/thepragmaticprogrammer.avif',
  },
  {
    id: 3,
    title: 'Design Patterns',
    src: '/images/designpatterns.avif',
  },
  {
    id: 4,
    title: 'Refactoring to Patterns',
    src: '/images/refactoringtopatterns.avif',
  },
  {
    id: 5,
    title: "You Don't Know JS Yet",
    src: '/images/youdontknowjsyet.avif',
  },
  {
    id: 6,
    title: 'Eloquent JavaScript',
    src: '/images/eloquentjavascript.avif',
  },
  {
    id: 7,
    title: 'Structure & Interpretation',
    src: '/images/structureandinterpretation.avif',
  },
];

const ITEM_COUNT = BOOKS.length;
const SLOT_ANGLE = 360 / ITEM_COUNT;
const AUTO_ROTATE_INTERVAL = 3000;
const DRAG_SENSITIVITY = 0.3;

const getTransform = (
  index,
  currentAngle,
  slotAngle,
  radius,
) => {
  const mySlot = index * slotAngle;
  let effective = mySlot - (currentAngle % 360);
  if (effective > 180) effective -= 360;
  if (effective < -180) effective += 360;

  const effectiveRad = (effective * Math.PI) / 180;
  const cosVal = Math.cos(effectiveRad);
  const sinVal = Math.sin(effectiveRad);

  return {
    x: sinVal * radius,
    z: cosVal * radius,
    rotateY: effective * 0.7,
    scale: 0.6 + 0.4 * ((cosVal + 1) / 2),
    opacity: 0.15 + 0.85 * ((cosVal + 1) / 2),
    zIndex: Math.round(cosVal * 100),
  };
};

const BookCard = ({
  book,
  index,
  angle,
  slotAngle,
  radiusRef,
}) => {
  const cardRef = useRef(null);

  const applyTransform = useCallback(
    (currentAngle) => {
      const t = getTransform(
        index,
        currentAngle,
        slotAngle,
        radiusRef.current,
      );
      if (cardRef.current) {
        cardRef.current.style.transform = `translateX(${t.x}px) translateZ(${t.z}px) rotateY(${t.rotateY}deg) scale(${t.scale})`;
        cardRef.current.style.opacity = t.opacity;
        cardRef.current.style.zIndex = t.zIndex;
      }
    },
    [index, slotAngle, radiusRef],
  );

  useEffect(() => {
    applyTransform(angle.get());
    const unsubscribe = angle.on('change', applyTransform);
    return unsubscribe;
  }, [angle, applyTransform]);

  // Initial position calculated for SSR/first paint
  const initial = getTransform(index, 0, slotAngle, 420);

  return (
    <div
      ref={cardRef}
      className='absolute flex flex-col items-center'
      style={{
        transformStyle: 'preserve-3d',
        transform: `translateX(${initial.x}px) translateZ(${initial.z}px) rotateY(${initial.rotateY}deg) scale(${initial.scale})`,
        opacity: initial.opacity,
        zIndex: initial.zIndex,
      }}
    >
      <div
        className='w-[100px] h-[150px] sm:w-[130px] sm:h-[190px] md:w-[150px] md:h-[220px] rounded-lg overflow-hidden relative select-none'
        style={{
          boxShadow:
            '-5px 0 15px rgba(0,0,0,0.3), 5px 0 15px rgba(0,0,0,0.3), 0 10px 30px rgba(0,0,0,0.5)',
        }}
      >
        <Image
          src={book.src}
          alt={book.title}
          fill
          className='object-cover rounded-lg pointer-events-none'
          loading='eager'
          draggable={false}
          sizes='(max-width: 640px) 100px, (max-width: 768px) 130px, 150px'
        />
        <div className='absolute inset-0 rounded-lg pointer-events-none z-50 bg-black/10' />
      </div>
    </div>
  );
};

const Books = () => {
  const angle = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const autoRotateTimer = useRef(null);
  const sectionRef = useRef(null);
  const radiusRef = useRef(300);
  const isInView = useInView(sectionRef, {
    once: false,
    margin: '-10%',
  });

  useEffect(() => {
    const updateRadius = () => {
      radiusRef.current =
        window.innerWidth >= 1024
          ? 420
          : window.innerWidth >= 640
            ? 300
            : 200;
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () =>
      window.removeEventListener('resize', updateRadius);
  }, []);

  const normalizeAngle = (a) => ((a % 360) + 360) % 360;

  const snapToNearest = useCallback(() => {
    const current = normalizeAngle(angle.get());
    const nearestSlot = Math.round(current / SLOT_ANGLE);
    const targetAngle = nearestSlot * SLOT_ANGLE;
    let diff = targetAngle - normalizeAngle(angle.get());
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    animate(angle, angle.get() + diff, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    });
    setActiveIndex(
      ((nearestSlot % ITEM_COUNT) + ITEM_COUNT) %
        ITEM_COUNT,
    );
  }, [angle]);

  const rotateToNext = useCallback(() => {
    const current = angle.get();
    animate(angle, current + SLOT_ANGLE, {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1],
    });
    setActiveIndex((prev) => (prev + 1) % ITEM_COUNT);
  }, [angle]);

  const startAutoRotate = useCallback(() => {
    clearInterval(autoRotateTimer.current);
    autoRotateTimer.current = setInterval(() => {
      if (!isDragging.current) {
        rotateToNext();
      }
    }, AUTO_ROTATE_INTERVAL);
  }, [rotateToNext]);

  useEffect(() => {
    startAutoRotate();
    return () => clearInterval(autoRotateTimer.current);
  }, [startAutoRotate]);

  const lastX = useRef(0);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    clearInterval(autoRotateTimer.current);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.clientX - lastX.current;
    lastX.current = e.clientX;
    angle.set(angle.get() + delta * DRAG_SENSITIVITY);
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    snapToNearest();
    startAutoRotate();
  };

  const goToIndex = (index) => {
    const targetAngle = index * SLOT_ANGLE;
    const current = normalizeAngle(angle.get());
    let diff = targetAngle - current;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    animate(angle, angle.get() + diff, {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1],
    });
    setActiveIndex(index);
  };

  return (
    <div
      ref={sectionRef}
      className='min-h-screen w-full bg-black flex flex-col justify-center items-center py-20 md:py-32 overflow-hidden relative'
    >
      <div className='text-center mb-16 md:mb-24'>
        <h2 className='text-4xl sm:text-5xl md:text-6xl font-light text-white'>
          Books I&apos;ve{' '}
          <span className='font-bold'>Read.</span>
        </h2>
        <p className='text-white/50 mt-4 text-sm sm:text-base'>
          Knowledge that shaped my thinking
        </p>
      </div>

      <div
        className='relative h-[300px] sm:h-[350px] md:h-[400px] w-full cursor-grab active:cursor-grabbing select-none'
        style={{
          perspective: '1200px',
          touchAction: 'pan-y',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
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
              slotAngle={SLOT_ANGLE}
              radiusRef={radiusRef}
            />
          ))}
        </div>
      </div>

      <div className='flex justify-center gap-2 absolute bottom-10 left-0 right-0'>
        {BOOKS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'bg-white w-6'
                : 'bg-white/30 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Books;

'use client';

import { useEffect, useState } from 'react';

interface ViewportSize {
  readonly width: number;
  readonly height: number;
}

const INITIAL_SIZE: ViewportSize = { width: 0, height: 0 };

export default function useViewportSize(): ViewportSize {
  const [size, setSize] = useState<ViewportSize>(INITIAL_SIZE);

  useEffect(() => {
    const updateSize = (): void => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize();
    window.addEventListener('resize', updateSize, { passive: true });
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}

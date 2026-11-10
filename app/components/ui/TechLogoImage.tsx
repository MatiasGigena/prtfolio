import Image from 'next/image';
import type { JSX } from 'react';
import type { TechLogo } from '@/app/types/portfolio';

interface TechLogoImageProps {
  readonly logo: TechLogo;
  /** Intrinsic size in pixels; the rendered size comes from `className`. */
  readonly size: number;
  readonly className: string;
}

export default function TechLogoImage({ logo, size, className }: TechLogoImageProps): JSX.Element {
  return (
    <Image
      src={logo.src}
      alt={logo.name}
      width={size}
      height={size}
      className={`object-contain ${logo.dark ? 'invert hue-rotate-180' : ''} ${className}`}
    />
  );
}

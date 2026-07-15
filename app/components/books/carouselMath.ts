export interface CarouselTransform {
  readonly x: number;
  readonly z: number;
  readonly rotateY: number;
  readonly scale: number;
  readonly opacity: number;
  readonly zIndex: number;
}

const PROJECTION_DECELERATION = 0.99;

export function normalizeIndex(index: number, itemCount: number): number {
  return ((index % itemCount) + itemCount) % itemCount;
}

export function projectVelocity(velocity: number): number {
  return ((velocity / 1000) * PROJECTION_DECELERATION) / (1 - PROJECTION_DECELERATION);
}

export function getCarouselTransform(
  index: number,
  currentAngle: number,
  radius: number,
  slotAngle: number,
): CarouselTransform {
  const slot = index * slotAngle;
  let effective = slot - (currentAngle % 360);
  if (effective > 180) effective -= 360;
  if (effective < -180) effective += 360;

  const radians = (effective * Math.PI) / 180;
  const cosine = Math.cos(radians);
  return {
    x: Math.sin(radians) * radius,
    z: cosine * radius,
    rotateY: effective * 0.7,
    scale: 0.6 + 0.4 * ((cosine + 1) / 2),
    opacity: 0.15 + 0.85 * ((cosine + 1) / 2),
    zIndex: Math.round(cosine * 100),
  };
}

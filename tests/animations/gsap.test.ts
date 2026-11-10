import { describe, expect, it, vi } from 'vitest';
import { createFollower, ensureScrollTrigger, gsap } from '@/app/animations/gsap';

describe('createFollower', () => {
  it('eases the element to the offsets it is given and retargets on later calls', async () => {
    const element = document.createElement('div');
    const follow = createFollower(element, 0.05);

    follow(30, -12);
    await vi.waitFor(() => {
      expect(gsap.getProperty(element, 'x')).toBe(30);
      expect(gsap.getProperty(element, 'y')).toBe(-12);
    });

    follow(0, 0);
    await vi.waitFor(() => expect(gsap.getProperty(element, 'x')).toBe(0));
  });
});

describe('ensureScrollTrigger', () => {
  it('registers the plugin so tweens can be driven by scroll', () => {
    const ScrollTrigger = ensureScrollTrigger();
    expect(ensureScrollTrigger()).toBe(ScrollTrigger);

    const element = document.createElement('div');
    document.body.append(element);
    const tween = gsap.to(element, { x: 100, scrollTrigger: { trigger: element, scrub: true } });

    expect(tween.scrollTrigger).toBeInstanceOf(ScrollTrigger);
    tween.revert();
    element.remove();
  });
});

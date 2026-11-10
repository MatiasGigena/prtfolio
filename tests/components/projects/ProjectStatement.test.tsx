import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { gsap } from '@/app/animations/gsap';
import ProjectStatement from '@/app/components/projects/ProjectStatement';
import { REDUCED_MOTION, setMediaFeatures } from '@/tests/support/browser';

const STATEMENT = 'Built with care, tested on real devices.';

const letters = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>('[data-letter]'));

describe('ProjectStatement', () => {
  it('splits the statement into words and letters so they can light up one by one', () => {
    const { container } = render(<ProjectStatement text={STATEMENT} />);

    expect(container.querySelectorAll('p')).toHaveLength(STATEMENT.split(' ').length);
    expect(letters(container).map((letter) => letter.textContent).join('')).toBe(
      STATEMENT.replace(/ /g, ''),
    );
  });

  it('scrubs the letters to full strength with the scroll and removes that on unmount', () => {
    const { container, unmount } = render(<ProjectStatement text={STATEMENT} />);
    const [first] = letters(container);

    const [tween] = gsap.getTweensOf(first ?? null);
    expect(tween?.scrollTrigger).toBeDefined();

    unmount();
    expect(gsap.getTweensOf(first ?? null)).toHaveLength(0);
  });

  it('leaves reduced-motion readers to the CSS that shows every letter at full strength', () => {
    setMediaFeatures(REDUCED_MOTION);
    const { container } = render(<ProjectStatement text={STATEMENT} />);

    for (const letter of letters(container)) {
      expect(letter).toHaveClass('motion-reduce:opacity-100');
      expect(gsap.getTweensOf(letter)).toHaveLength(0);
    }
  });
});

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { gsap } from '@/app/animations/gsap';
import ProjectStatement from '@/app/components/projects/ProjectStatement';
import { WORK_STATEMENT } from '@/app/data/portfolio';
import { REDUCED_MOTION, setMediaFeatures } from '@/tests/support/browser';

const letters = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>('[data-letter]'));

describe('ProjectStatement', () => {
  it('splits the statement into words and letters so they can light up one by one', () => {
    const { container } = render(<ProjectStatement />);

    expect(container.querySelectorAll('p')).toHaveLength(WORK_STATEMENT.split(' ').length);
    expect(letters(container).map((letter) => letter.textContent).join('')).toBe(
      WORK_STATEMENT.replace(/ /g, ''),
    );
  });

  it('scrubs the letters to full strength with the scroll and removes that on unmount', () => {
    const { container, unmount } = render(<ProjectStatement />);
    const [first] = letters(container);

    const [tween] = gsap.getTweensOf(first ?? null);
    expect(tween?.scrollTrigger).toBeDefined();

    unmount();
    expect(gsap.getTweensOf(first ?? null)).toHaveLength(0);
  });

  it('leaves reduced-motion readers to the CSS that shows every letter at full strength', () => {
    setMediaFeatures(REDUCED_MOTION);
    const { container } = render(<ProjectStatement />);

    for (const letter of letters(container)) {
      expect(letter).toHaveClass('motion-reduce:opacity-100');
      expect(gsap.getTweensOf(letter)).toHaveLength(0);
    }
  });
});

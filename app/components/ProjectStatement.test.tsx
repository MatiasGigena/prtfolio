import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WORK_STATEMENT } from '@/app/data/portfolio';
import { REDUCED_MOTION, setMediaFeatures } from '@/test/browser';
import ProjectStatement from './ProjectStatement';

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

  it('shows every letter at full strength when the reader prefers reduced motion', () => {
    setMediaFeatures(REDUCED_MOTION);
    const { container } = render(<ProjectStatement />);

    for (const letter of letters(container)) expect(letter.style.opacity).toBe('1');
  });
});

import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NAVIGATION_ITEMS } from '@/app/data/portfolio';
import HomePage from '@/app/page';

describe('HomePage', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('shows the preloader over the page, then removes it', () => {
    render(<HomePage />);
    expect(screen.getByText('Get creative!')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(2300));

    expect(screen.queryByText('Get creative!')).not.toBeInTheDocument();
  });

  it('renders exactly one section for every navigation item', () => {
    render(<HomePage />);

    for (const item of NAVIGATION_ITEMS) {
      expect(document.querySelectorAll(`[id="${item.target}"]`)).toHaveLength(1);
    }
  });

  it('includes every section of the page in order', () => {
    render(<HomePage />);

    const landmarks = Array.from(document.querySelectorAll('main section')).map(
      (section) => section.getAttribute('aria-label') ?? section.getAttribute('aria-labelledby'),
    );
    expect(landmarks).toEqual([
      'Introduction',
      'Selected work',
      'Technology gallery',
      'skills-heading',
      'books-heading',
      'about-heading',
      'contact-heading',
    ]);
  });
});

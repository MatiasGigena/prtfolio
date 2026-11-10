import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { BOOKS } from '@/app/data/portfolio';
import BooksCarousel from './BooksCarousel';

function caption(): HTMLElement {
  const element = document.querySelector<HTMLElement>('[aria-live="polite"]');
  if (!element) throw new Error('Caption missing');
  return element;
}

describe('BooksCarousel', () => {
  it('captions the first book until another is chosen', () => {
    render(<BooksCarousel />);
    const [first] = BOOKS;

    expect(caption()).toHaveTextContent(`${first?.title}— ${first?.author}`);
  });

  it('selects a book when it is clicked and announces it', async () => {
    render(<BooksCarousel />);
    const book = BOOKS[3];
    if (!book) throw new Error('Expected at least four books');
    const button = screen.getByRole('button', { name: `Show ${book.title} by ${book.author}` });

    await userEvent.setup().click(button);

    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(caption()).toHaveTextContent(book.title);
  });

  it('lets keyboard and screen reader users reach each book once, not once per marquee copy', () => {
    render(<BooksCarousel />);
    const marquee = screen.getByRole('region', { name: /Selected books/ });

    expect(within(marquee).getAllByRole('button')).toHaveLength(BOOKS.length);
    const focusable = marquee.querySelectorAll('button:not([tabindex="-1"])');
    expect(focusable).toHaveLength(BOOKS.length);
  });
});

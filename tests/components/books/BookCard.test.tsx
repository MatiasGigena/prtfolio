import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Book } from '@/app/types/portfolio';
import BookCard from '@/app/components/books/BookCard';

const book: Book = {
  id: 1,
  title: 'Clean Code',
  author: 'Robert C. Martin',
  image: '/images/book-clean-code.avif',
  accent: '#b9c7b3',
};

describe('BookCard', () => {
  it('is a toggle button named after the book', () => {
    render(<BookCard book={book} isActive tabIndex={0} onSelect={() => undefined} />);

    const button = screen.getByRole('button', { name: 'Show Clean Code by Robert C. Martin' });
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('reports a click and paints its back board in the book accent', async () => {
    const onSelect = vi.fn();
    const { container } = render(<BookCard book={book} isActive={false} tabIndex={-1} onSelect={onSelect} />);

    await userEvent.setup().click(screen.getByRole('button'));

    expect(onSelect).toHaveBeenCalledOnce();
    expect(container.querySelector<HTMLElement>('.book-board')?.style.getPropertyValue('--book-accent')).toBe(
      '#b9c7b3',
    );
  });
});

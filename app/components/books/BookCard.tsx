'use client';

import Image from 'next/image';
import type { Book } from '@/app/types/portfolio';

interface BookCardProps {
  readonly book: Book;
  readonly isActive: boolean;
  readonly onSelect: () => void;
  readonly tabIndex: number;
}

export default function BookCard({
  book,
  isActive,
  onSelect,
  tabIndex,
}: BookCardProps): JSX.Element {
  return (
    <button
      type='button'
      className='shelf-book pressable shrink-0'
      aria-label={`Show ${book.title} by ${book.author}`}
      aria-pressed={isActive}
      tabIndex={tabIndex}
      onClick={onSelect}
    >
      <span className='book-object'>
        <span className='book-board' style={{ backgroundColor: book.accent }} />
        <span className='book-page-edge book-page-edge-right' aria-hidden='true' />
        <span className='book-page-edge book-page-edge-bottom' aria-hidden='true' />
        <span className='shelf-book-cover'>
          <Image
            src={book.image}
            alt=''
            fill
            className='pointer-events-none object-cover'
            draggable={false}
            sizes='(max-width: 640px) 104px, 120px'
          />
          <span className='book-cover-hinge' aria-hidden='true' />
          <span className='book-cover-light' aria-hidden='true' />
        </span>
      </span>
    </button>
  );
}

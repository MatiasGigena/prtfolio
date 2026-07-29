'use client';

import { useState } from 'react';
import { BOOKS } from '@/app/data/portfolio';
import BookCard from './books/BookCard';

const MARQUEE_COPIES = 3;

export default function BooksCarousel(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBook = BOOKS[activeIndex];

  return (
    <section
      className='relative w-full overflow-hidden bg-[#050505] px-5 py-20 text-white sm:px-8 md:py-24 lg:px-12 xl:px-16'
      aria-labelledby='books-heading'
    >
      <div className='mx-auto w-full max-w-[90rem]'>
        <header className='flex flex-col gap-3 border-b border-white/15 pb-7 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <p className='text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/45'>
              Selected reading
            </p>
            <h2
              id='books-heading'
              className='mt-2 text-4xl font-medium leading-none tracking-[-0.045em] sm:text-5xl'
            >
              On my shelf.
            </h2>
          </div>
          <p className='text-sm text-white/45 sm:pb-1'>A few books I return to.</p>
        </header>

        <div
          className='book-marquee mt-12'
          role='region'
          aria-label='Selected books, scrolling automatically. Hover or focus to pause.'
        >
          <div className='book-marquee-track'>
            {Array.from({ length: MARQUEE_COPIES }, (_, copy) => (
              <div
                key={copy}
                className='book-marquee-group'
                aria-hidden={copy > 0 ? 'true' : undefined}
              >
                {BOOKS.map((book, index) => (
                  <BookCard
                    key={`${copy}-${book.id}`}
                    book={book}
                    isActive={index === activeIndex}
                    onSelect={() => setActiveIndex(index)}
                    tabIndex={copy > 0 ? -1 : 0}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {activeBook ? (
          <p
            className='mt-7 min-h-14 border-t border-white/15 pt-5 text-base'
            aria-live='polite'
            aria-atomic='true'
          >
            <span className='font-medium text-white'>{activeBook.title}</span>
            <span className='ml-2 text-white/40'>— {activeBook.author}</span>
          </p>
        ) : null}
      </div>
    </section>
  );
}

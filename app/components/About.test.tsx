import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ABOUT, SECTION_IDS } from '@/app/data/portfolio';
import { FakeIntersectionObserver } from '@/test/browser';
import About from './About';

function blocks(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-block]'));
}

function read(block: HTMLElement | undefined): void {
  if (!block) throw new Error('Block missing');
  act(() => FakeIntersectionObserver.intersect(block));
}

describe('About', () => {
  it('starts on the introduction under the section heading', () => {
    render(<About />);

    expect(screen.getByRole('region', { name: 'About' })).toHaveAttribute('id', SECTION_IDS.about);
    expect(screen.getByText(ABOUT.intro)).toHaveClass('opacity-100');
    expect(blocks()).toHaveLength(ABOUT.topics.length + 1);
  });

  it('swaps the heading word for the topic being read and dims the others', async () => {
    render(<About />);
    const topic = ABOUT.topics[1];
    if (!topic) throw new Error('Expected at least two topics');

    read(blocks()[2]);

    expect(await screen.findByText(topic.word)).toBeInTheDocument();
    expect(blocks()[2]).toHaveClass('opacity-100');
    expect(blocks()[0]).toHaveClass('opacity-[0.35]');
  });

  it('returns to the section name when the reader scrolls back to the introduction', async () => {
    render(<About />);

    read(blocks()[3]);
    read(blocks()[0]);

    expect(blocks()[0]).toHaveClass('opacity-100');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('About');
  });

  it('links its call to action to the contact section', () => {
    render(<About />);
    expect(screen.getByRole('link', { name: ABOUT.cta.label })).toHaveAttribute(
      'href',
      `#${SECTION_IDS.contact}`,
    );
  });
});

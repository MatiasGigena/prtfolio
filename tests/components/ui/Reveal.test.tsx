import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FakeIntersectionObserver } from '@/tests/support/browser';
import Reveal from '@/app/components/ui/Reveal';

function renderReveal(): { wrapper: HTMLElement; animated: HTMLElement } {
  render(
    <Reveal className='w-full' direction='up'>
      <p>Section content</p>
    </Reveal>,
  );
  const animated = screen.getByText('Section content').parentElement;
  const wrapper = animated?.parentElement;
  if (!animated || !wrapper) throw new Error('Reveal structure changed');
  return { wrapper, animated };
}

describe('Reveal', () => {
  it('renders its content hidden in a wrapper that carries the layout classes', () => {
    const { wrapper, animated } = renderReveal();

    expect(wrapper).toHaveClass('w-full');
    expect(animated.style.opacity).toBe('0');
  });

  it('fades the content in once it scrolls into view', async () => {
    const { wrapper, animated } = renderReveal();

    act(() => FakeIntersectionObserver.intersect(wrapper));

    await vi.waitFor(() => expect(animated.style.opacity).toBe('1'));
  });
});

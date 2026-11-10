import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { NAVIGATION_ITEMS } from '@/app/data/portfolio';
import { REDUCED_MOTION, setMediaFeatures } from '@/tests/support/browser';
import Navigation from '@/app/components/Navigation';

function renderWithSections(): Record<string, HTMLElement> {
  render(
    <>
      <Navigation />
      {NAVIGATION_ITEMS.map((item) => (
        <section key={item.target} id={item.target} data-testid={item.target} />
      ))}
    </>,
  );
  return Object.fromEntries(NAVIGATION_ITEMS.map((item) => [item.target, screen.getByTestId(item.target)]));
}

const desktopLinks = (): HTMLElement => screen.getAllByRole('list')[0] as HTMLElement;

function firstItem(): (typeof NAVIGATION_ITEMS)[number] {
  const [first] = NAVIGATION_ITEMS;
  if (!first) throw new Error('No navigation items');
  return first;
}

describe('Navigation', () => {
  it('scrolls smoothly to the section a link names', async () => {
    const sections = renderWithSections();
    const user = userEvent.setup();

    for (const item of NAVIGATION_ITEMS) {
      await user.click(within(desktopLinks()).getByRole('button', { name: item.label }));
      expect(sections[item.target]?.scrollIntoView).toHaveBeenLastCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });

  it('jumps without animation when the reader prefers reduced motion', async () => {
    setMediaFeatures(REDUCED_MOTION);
    const sections = renderWithSections();
    const first = firstItem();

    await userEvent.setup().click(within(desktopLinks()).getByRole('button', { name: first.label }));

    expect(sections[first.target]?.scrollIntoView).toHaveBeenLastCalledWith({
      behavior: 'auto',
      block: 'start',
    });
  });

  it('opens the mobile menu and closes it after a section is chosen', async () => {
    renderWithSections();
    const user = userEvent.setup();
    const toggle = screen.getByRole('button', { name: 'Toggle navigation menu' });
    const menu = document.getElementById('mobile-navigation');
    if (!menu) throw new Error('Mobile menu missing');

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(menu).toHaveAttribute('aria-hidden', 'true');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(menu).toHaveAttribute('aria-hidden', 'false');

    await user.click(within(menu).getByRole('button', { name: firstItem().label }));
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('ignores a missing section instead of throwing', async () => {
    render(<Navigation />);
    const spy = vi.spyOn(Element.prototype, 'scrollIntoView');
    await userEvent.setup().click(within(desktopLinks()).getByRole('button', { name: firstItem().label }));

    expect(spy).not.toHaveBeenCalled();
  });
});

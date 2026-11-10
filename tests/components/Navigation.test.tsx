import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Navigation from '@/app/components/Navigation';
import { NAVIGATION_ITEMS } from '@/app/data/portfolio';

function menus(): { desktop: HTMLElement; mobile: HTMLElement } {
  const mobile = document.getElementById('mobile-navigation');
  const desktop = screen.getAllByRole('list').find((list) => list !== mobile);
  if (!mobile || !desktop) throw new Error('Navigation lists missing');
  return { desktop, mobile };
}

describe('Navigation', () => {
  it('links every section by its anchor in both menus', () => {
    render(<Navigation />);
    const { desktop, mobile } = menus();

    for (const menu of [desktop, mobile]) {
      for (const item of NAVIGATION_ITEMS) {
        expect(within(menu).getByRole('link', { name: item.label, hidden: true })).toHaveAttribute(
          'href',
          `#${item.target}`,
        );
      }
    }
  });

  it('keeps the closed mobile menu out of the tab order and the accessibility tree', () => {
    render(<Navigation />);
    const { mobile } = menus();

    expect(mobile).toHaveAttribute('aria-hidden', 'true');
    for (const link of within(mobile).getAllByRole('link', { hidden: true })) {
      expect(link).toHaveAttribute('tabindex', '-1');
    }
  });

  it('opens the mobile menu and closes it once a section is chosen', async () => {
    render(<Navigation />);
    const user = userEvent.setup();
    const toggle = screen.getByRole('button', { name: 'Toggle navigation menu' });
    const { mobile } = menus();

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(mobile).toHaveAttribute('aria-hidden', 'false');

    const [first] = within(mobile).getAllByRole('link');
    if (!first) throw new Error('Mobile menu has no links');
    await user.click(first);

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(mobile).toHaveAttribute('aria-hidden', 'true');
  });
});

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  AnimationIcon,
  ArrowDownRightIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MenuIcon,
  WhatsAppIcon,
} from '@/app/components/ui/Icons';

const ICONS = {
  AnimationIcon,
  ArrowDownRightIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MenuIcon,
  WhatsAppIcon,
};

describe('Icons', () => {
  it.each(Object.entries(ICONS))('%s is decorative and sized in pixels', (_name, Icon) => {
    const { container } = render(<Icon size={20} />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('width', '20');
    expect(svg).toHaveAttribute('height', '20');
    expect(svg?.childElementCount).toBeGreaterThan(0);
  });

  it('fills solid marks and strokes outline marks with the text colour', () => {
    const { container } = render(
      <>
        <LinkedInIcon />
        <InstagramIcon />
      </>,
    );
    const [solid, outline] = Array.from(container.querySelectorAll('svg'));

    expect(solid).toHaveAttribute('fill', 'currentColor');
    expect(outline).toHaveAttribute('fill', 'none');
    expect(outline).toHaveAttribute('stroke', 'currentColor');
  });

  it('lets callers override presentation attributes', () => {
    const { container } = render(<ArrowDownRightIcon strokeWidth={2.25} className='h-4 w-4' />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('stroke-width', '2.25');
    expect(svg).toHaveClass('h-4', 'w-4');
  });
});

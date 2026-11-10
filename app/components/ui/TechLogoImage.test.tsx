import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TechLogoImage from './TechLogoImage';

describe('TechLogoImage', () => {
  it('uses the technology name as alt text and keeps the caller classes', () => {
    render(<TechLogoImage logo={{ name: 'React', src: '/react.svg' }} size={70} className='h-9 w-9' />);
    const image = screen.getByAltText('React');

    expect(image).toHaveAttribute('src', '/react.svg');
    expect(image).toHaveAttribute('width', '70');
    expect(image).toHaveClass('object-contain', 'h-9', 'w-9');
    expect(image).not.toHaveClass('invert');
  });

  it('inverts logos drawn dark so they show on black', () => {
    render(<TechLogoImage logo={{ name: 'GitHub', src: '/github.svg', dark: true }} size={100} className='' />);

    expect(screen.getByAltText('GitHub')).toHaveClass('invert', 'hue-rotate-180');
  });
});

import { isValidElement, type ReactElement, type ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import RootLayout, { metadata } from '@/app/layout';
import SmoothScroll from '@/app/components/SmoothScroll';

vi.mock('next/font/google', () => ({ Poppins: () => ({ className: 'font-poppins' }) }));

type Props = { readonly className?: string; readonly lang?: string; readonly children?: ReactNode };

function childrenOf(element: ReactElement<Props>): ReactNode[] {
  const { children } = element.props;
  return Array.isArray(children) ? children : [children];
}

describe('RootLayout', () => {
  it('renders an English document on black with the Poppins font', () => {
    const html = RootLayout({ children: <main /> }) as ReactElement<Props>;
    const [body] = childrenOf(html);

    expect(html.type).toBe('html');
    expect(html.props.lang).toBe('en');
    expect(html.props.className).toContain('bg-black');
    expect(isValidElement(body) && body.type).toBe('body');
    expect(isValidElement<Props>(body) && body.props.className).toBe('font-poppins');
  });

  it('mounts smooth scrolling ahead of the page content', () => {
    const page = <main />;
    const html = RootLayout({ children: page }) as ReactElement<Props>;
    const [body] = childrenOf(html);
    if (!isValidElement<Props>(body)) throw new Error('Body missing');
    const [scroller, content] = childrenOf(body);

    expect(isValidElement(scroller) && scroller.type).toBe(SmoothScroll);
    expect(content).toBe(page);
  });

  it('describes the site for search engines and tabs', () => {
    expect(metadata.title).toBe('Matias Gigena');
    expect(metadata.description).toBeTruthy();
  });
});

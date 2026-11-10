import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import type { JSX, ReactNode } from 'react';
import SmoothScroll from './components/SmoothScroll';
import 'lenis/dist/lenis.css';
import './globals.css';
// Section styles come after Tailwind's utilities so they win ties of equal specificity.
import './styles/hero.css';
import './styles/sections.css';
import './styles/books.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Matias Gigena',
  description: 'Mi portafolio de desarrollo web',
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang='en' className='bg-black'>
      <body className={poppins.className}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

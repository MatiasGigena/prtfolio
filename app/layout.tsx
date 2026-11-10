import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import type { JSX, ReactNode } from 'react';
import SmoothScroll from './components/shell/SmoothScroll';
import 'lenis/dist/lenis.css';
import './styles/globals.css';
// Component styles come after Tailwind's utilities so they win ties of equal specificity.
import './styles/navigation.css';
import './styles/preloader.css';
import './styles/hero.css';
import './styles/projects.css';
import './styles/tech-gallery.css';
import './styles/books.css';
import './styles/contact.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Matias Gigena',
  description: 'Portfolio of Matías Gigena, a front-end developer in Buenos Aires building accessible, motion-rich interfaces.',
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

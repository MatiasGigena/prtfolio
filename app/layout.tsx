import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import type { ReactNode } from 'react';
import SmoothScroll from './components/SmoothScroll';
import 'lenis/dist/lenis.css';
import './globals.css';

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

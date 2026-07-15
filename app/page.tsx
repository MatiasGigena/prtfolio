'use client';

import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import About from './components/About';
import BooksCarousel from './components/BooksCarousel';
import Contact from './components/Contact';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import Preloader from './components/Preloader';
import Projects from './components/Projects';
import SkillsCloud from './components/SkillsCloud';
import TechStack from './components/TechStack';
import Reveal from './components/ui/Reveal';

const PRELOADER_VISIBLE_MS = 900;

export default function HomePage(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), PRELOADER_VISIBLE_MS);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <main>
      <AnimatePresence mode='wait'>{isLoading ? <Preloader /> : null}</AnimatePresence>
      <Navigation />
      <Hero />
      <section className='min-h-screen w-full bg-black flex flex-col relative justify-start items-start text-white'>
        <Projects />
        <div className='bg-sec h-full w-full'>
          <Reveal direction='right'>
            <TechStack />
          </Reveal>
          <Reveal>
            <SkillsCloud />
          </Reveal>
        </div>
        <Reveal className='w-full'>
          <BooksCarousel />
        </Reveal>
        <About />
        <Contact />
      </section>
    </main>
  );
}

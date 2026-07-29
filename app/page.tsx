'use client';

import { useState } from 'react';
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

export default function HomePage(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main>
      {isLoading ? <Preloader onFinish={() => setIsLoading(false)} /> : null}
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

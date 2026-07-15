'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { NAVIGATION_ITEMS } from '@/app/data/portfolio';
import { MenuIcon } from './ui/Icons';
import Magnetic from './ui/Magnetic';

export default function Navigation(): JSX.Element {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = navRef.current;
    if (!element) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: () => window.innerHeight / 1.25,
      onLeave: () =>
        gsap.to(element, {
          yPercent: reduceMotion ? 0 : -110,
          autoAlpha: 0,
          duration: 0.2,
          ease: 'power3.out',
          overwrite: true,
        }),
      onEnterBack: () =>
        gsap.to(element, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.2,
          ease: 'power3.out',
          overwrite: true,
        }),
    });
    return () => {
      trigger.kill();
      gsap.killTweensOf(element);
    };
  }, []);

  const scrollTo = (targetId: `#${string}`): void => {
    const target = document.querySelector(targetId);
    if (!(target instanceof HTMLElement)) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className='fixed inset-x-0 top-0 z-40 h-16 bg-black/20 text-white backdrop-blur-md'
      aria-label='Primary navigation'
    >
      <div className='h-full px-6 flex items-center justify-between'>
        <span className='text-xl'>Matías Gigena</span>

        <button
          type='button'
          className='pressable sm:hidden p-2 -mr-2 rounded-md'
          aria-expanded={menuOpen}
          aria-controls='mobile-navigation'
          aria-label='Toggle navigation menu'
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon />
        </button>

        <ul className='hidden sm:flex items-center gap-1'>
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.targetId}>
              <Magnetic>
                <button
                  type='button'
                  onClick={() => scrollTo(item.targetId)}
                  className='pressable px-3 py-2 text-sm uppercase rounded-md'
                >
                  {item.label}
                </button>
              </Magnetic>
            </li>
          ))}
        </ul>

        <ul
          id='mobile-navigation'
          className={`mobile-menu absolute left-4 top-14 w-52 rounded-xl bg-black/75 p-2 shadow-xl backdrop-blur-xl sm:hidden ${menuOpen ? 'is-open' : ''}`}
          aria-hidden={!menuOpen}
        >
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.targetId}>
              <button
                type='button'
                tabIndex={menuOpen ? 0 : -1}
                className='pressable block w-full rounded-lg px-4 py-3 text-left'
                onClick={() => scrollTo(item.targetId)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

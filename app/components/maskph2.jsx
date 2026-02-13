'use client';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import MaskText from '../components/reusable/phrases';
import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaskTitles from './reusable/titles';

const MaskTextPhrase = () => {
  const phrases = [
    "I'm {{Matias Gigena}}, your {{argentinian}} guide through the digital wonderland.",
    'Crafting the virtual world as a {{Front End Developer}}.',
    "Over {{4 years}} of {{self-driven}} learning, building, and shipping real-world projects.",
    'Currently employed at {{UseTeam}}.',
  ];
  const phrases1 = [
    '{{Advanced}} English speaker at {{C1}} level.',
    'Validated through international {{Certificate in Advanced English}} (CAE).',
    'Enriching experience at {{Harrows House International College}} in Swanage.',
    'Proud alumnus of Escuela del Mirador, a {{bilingual}} school.',
  ];
  const phrases2 = [
    "Beyond a developer, I'm a {{coding enthusiast}} refining my skills.",
    'Embracing {{leadership}}, {{approachability}}, and {{strong social skills}} for trust.',
    'Dedicated {{hard worker}}, pushing limits to {{elevate}} projects.',
    'Engaging coding pursuits and a friendly disposition for {{impactful contributions}}.',
  ];
  const phrases3 = ['{{Contact ME.}}'];
  const sectionref = useRef(null);
  const triggerRef = useRef(null);
  const about = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      const pin = gsap.fromTo(
        sectionref.current,
        {
          translateX: 0,
        },
        {
          translateX: '-300vw',
          ease: 'none',
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '2000 top',
            scrub: 0.6,
            pin: true,
          },
        }
      );
      return () => {
        pin.kill();
      };
    }
  }, []);
  const isInView = useInView(about, { once: false });
  const animate = {
    initial: { x: '-50%', opacity: 0 },
    open: {
      x: '0%',
      opacity: 1,
      transition: {
        duration: 1.2,
        delay: 0.1,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };
  return (
    <section
      id='About'
      className=' w-full lg:overflow-hidden'
    >
      <div ref={triggerRef}>
        <div
          ref={sectionref}
          className='lg:w-[400vw] w-full flex relative lg:flex-row flex-col  lg:gap-0 lg:my-0'
        >
          <div className='h-screen flex-col w-full lg:w-[100vw] flex justify-center gap-24 lg:gap-14 items-center'>
            <motion.h1
              ref={about}
              initial='initial'
              variants={animate}
              animate={isInView ? 'open' : ''}
              className='text-5xl sm:text-7xl'
            >
              About{' '}
              <span className='text-white font-bold'>
                ME.
              </span>
            </motion.h1>
            <MaskText phrases={phrases} />
          </div>
          <div className='h-[80vh] lg:h-screen w-full lg:w-[100vw] flex justify-center items-center'>
            <MaskText phrases={phrases1} />
          </div>
          <div className='h-[80vh] lg:h-screen w-full lg:w-[100vw] flex justify-center items-center'>
            <MaskText phrases={phrases2} />
          </div>
          <div className='h-screen w-full lg:w-[100vw] flex flex-col justify-center z-50  gap-20 items-center'>
            <MaskTitles phrases={phrases3} isLast />
            <span className='animate-bounce'>
              <ExpandCircleDownIcon
                style={{ fontSize: '6rem' }}
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MaskTextPhrase;

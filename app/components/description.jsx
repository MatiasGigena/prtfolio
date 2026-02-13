'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
const Description = () => {
  const refs = useRef([]);
  const container = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    createAnimations();
  }, []);
  const createAnimations = () => {
    gsap.to(refs.current, {
      opacity: 1,
      ease: 'none',
      stagger: 0.1,
      scrollTrigger: {
        trigger: container.current,
        start: () => `top+=${window.innerHeight - 1200}`,
        end: `+=${window.innerHeight / 1.5}`,
        scrub: true,
      },
    });
  };
  const phrase =
    "It's not just a Project. I take pride in crafting digital experiences that not only meet functional requirements but also delight users with intuitive interfaces and smooth interactions.";
  const splitWords = () => {
    let body = [];
    phrase.split(' ').forEach((word, index) => {
      const letters = splitLetters(word);
      body.push(
        <p
          className='text-[4vw] mr-3 mb-2'
          key={`word_${index}`}
        >
          {letters}
        </p>
      );
    });
    return body;
  };
  const splitLetters = (word) => {
    let letters = [];
    word.split('').forEach((letter, index) => {
      letters.push(
        <span
          ref={(e) => {
            refs.current.push(e);
          }}
          className='opacity-50'
          key={`letter_${index}`}
        >
          {letter}
        </span>
      );
    });
    return letters;
  };
  return (
    <div
      ref={container}
      className='flex items-center xlxl:px-6 mt-8 lg:mt-16 justify-start lg:justify-evenly text-sec py-8 lg:py-12'
    >
      <div className='w-11/12 flex items-center  h-full  flex-wrap'>
        {splitWords()}
      </div>
    </div>
  );
};
export default Description;

"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const LandingPage = () => {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-500px",
    });
    requestAnimationFrame(animation);
  }, []);
  const animation = () => {
    if (xPercent < -100) {
      xPercent = 0;
    }
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, {
      xPercent: xPercent,
    });
    gsap.set(secondText.current, {
      xPercent: xPercent,
    });
    requestAnimationFrame(animation);
    xPercent += 0.1 * direction;
  };
  return (
    <main id="Home" className="h-screen bg-black relative overflow-hidden flex ">
      <Image src="/images/portfolio12-removebg.png" fill={true} alt="" priority={true} className="my-image" />
      <div className="sliderContainer">
        <div ref={slider} className=" relative whitespace-nowrap ">
          <p ref={firstText} className="text-white text-[6rem] pr-8 sm:text-[230px] sm:pr-[50px] m-0 relative font-thin" style={{textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"}}>
            Front End Developer -
          </p>
          <p ref={secondText} className="text-white text-[6rem] pr-8 sm:text-[230px] sm:pr-[50px] top-0 font-thin absolute left-[100%]">
            Front End Developer -
          </p>
        </div>
      </div>
    </main>
  );
};
export default LandingPage;

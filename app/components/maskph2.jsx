"use client";
import useMousePosition from "@/hooks/useMousePosition";
import MaskText from "../components/reusable/phrases";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MaskTextPhrase = () => {
  const phrases = [
    "I'm {{Matias Gigena}}, your {{argentinian}} guide through the digital wonderland.",
    "Crafting the virtual world as a {{Front End Developer}}.",
    "Graduated from {{Soy Henry's}} immersive 800-hour bootcamp.",
    "Currently employed at {{Huntek}}.",
  ];
  const phrases1 = [
    "{{Advanced}} English speaker at {{C1}} level.",
    "Validated through international {{Certificate in Advanced English}} (CAE).",
    "Enriching experience at {{Harrows House International College}} in Swanage.",
    "Proud alumnus of Escuela del Mirador, a {{bilingual}} school.",
  ];
  const phrases2 = [
    "Beyond a developer, I'm a {{coding enthusiast}} refining my skills.",
    "Embracing {{leadership}}, {{approachability}}, and {{strong social skills}} for trust.",
    "Dedicated {{hard worker}}, pushing limits to {{elevate}} projects.",
    "Engaging coding pursuits and a friendly disposition for {{impactful contributions}}.",
  ];
  const sectionref = useRef(null);
  const triggerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      // Only apply the animation on screens with size lg or larger
      const pin = gsap.fromTo(
        sectionref.current,
        {
          translateX: 0,
        },
        {
          translateX: "-300vw",
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "2000 top",
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
  return (
    <section id="About" className="lg:overflow-hidden">
      <div ref={triggerRef}>
        <div ref={sectionref} className="min-h-screen lg:w-[400vw] w-full flex relative lg:flex-row flex-col gap-20 lg:gap-0 my-10 lg:my-0">
          <div className="h-screen flex-col w-full lg:w-[100vw] flex justify-center gap-14 items-center">
            <h1 className="text-5xl sm:text-7xl">
              About <span className="text-white font-bold">ME.</span>
            </h1>
            <MaskText phrases={phrases} />
          </div>
          <div className="h-screen w-full lg:w-[100vw] flex justify-center items-center">
            <MaskText phrases={phrases1} />
          </div>
          <div className="h-screen w-full lg:w-[100vw] flex justify-center items-center">
            <MaskText phrases={phrases2} />
          </div>
          <div className="h-screen w-full lg:w-[100vw] flex justify-center items-center">
          <div className="text-7xl font-bold text-white">↓</div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MaskTextPhrase;
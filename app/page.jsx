"use client"
import React, { useEffect, useState } from "react"
import LandingPage from "./components/landingpage"
import Projects from "./components/projects";
import Aptitudes from "./components/aptitudes";
import Preloader from "./components/preloader";
import { AnimatePresence } from "framer-motion";
import AboutPage from "./components/techStack";
import MaskComponent from "./components/reusable/componentX";
import MaskComponentY from "./components/reusable/componentY";
import MaskTextPhrase from "./components/maskph2";
  const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll({
        lenisOptions: {
          duration: 2,
        },
      });
      setTimeout(() => {
        setIsLoading(false)
        document.body.style.cursor = "default"
        document.body.style.overflowY = "scroll"
      }, 2000)
    })();
  }, []);
  return (
    <main>
      <AnimatePresence mode="wait">
      {
        isLoading && <Preloader/>
      }
      </AnimatePresence>
      <LandingPage />
      <section className="min-h-screen w-full bg-black flex flex-col relative justify-start items-start text-white">
        <Projects />
        <div className="bg-sec h-full w-full">
          <MaskComponent components={[AboutPage]}/>
          <MaskComponentY components={[Aptitudes]}/>
        </div>
        <MaskComponentY components={[MaskTextPhrase]}/>
      </section>
    </main>
  )
}
export default HomePage
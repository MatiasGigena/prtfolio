"use client"
import React, { useEffect, useState } from "react"
import LandingPage from "./components/landingpage"
import Projects from "./components/projects";
import Aptitudes from "./components/aptitudes";
import Preloader from "./components/preloader";
import { AnimatePresence } from "framer-motion";
import AboutPage from "./components/techStack";
const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll({
        lenisOptions: {
          duration: 1,
        },
      });
      setTimeout(() => {
        setIsLoading(false)
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
      <LandingPage id="Home"/>
      <section className="min-h-screen w-full bg-black flex flex-col relative justify-start items-start text-white">
        <Projects id="About"/>
        <div className="bg-sec h-full w-full">
          <AboutPage/>
          <Aptitudes/>
        </div>
      </section>
    </main>
  )
}
export default HomePage
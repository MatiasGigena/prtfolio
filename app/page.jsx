'use client'
import React, { useEffect, useState } from 'react'
import LandingPage from './components/landingpage'
import Projects from './components/projects'
import Aptitudes from './components/aptitudes'
import Preloader from './components/preloader'
import { AnimatePresence } from 'framer-motion'
import AboutPage from './components/techStack'
import MaskComponent from './components/reusable/componentX'
import MaskTextPhrase from './components/maskph2'
import NavBar from './components/nav'
import Contact from './components/contact'
import MaskComponentY from './components/reusable/componentY'
const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [locomotiveScroll, setLocomotiveScroll] =
    useState(null)

  useEffect(() => {
    ;(async () => {
      const LocomotiveScroll = (
        await import('locomotive-scroll')
      ).default
      const locomotiveScrollInstance = new LocomotiveScroll(
        {
          lenisOptions: {
            duration: 3.5,
            smoothTouch: true,
            touchMultiplier: 1.7,
            lerp: 0.01,
          },
        }
      )
      setLocomotiveScroll(locomotiveScrollInstance)
      setTimeout(() => {
        setIsLoading(false)
        document.body.style.cursor = 'default'
        locomotiveScrollInstance.scrollTo(0, 0)
      }, 2000)
    })()
  }, [])

  return (
    <main>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <NavBar locomotiveScroll={locomotiveScroll} />
      <LandingPage />
      <section className='min-h-screen w-full bg-black flex flex-col relative justify-start items-start text-white'>
        <Projects />
        <div className='bg-sec h-full w-full'>
          <MaskComponent components={[AboutPage]} />
          <MaskComponentY components={[Aptitudes]} />
        </div>
        <MaskTextPhrase />
        <Contact />
      </section>
    </main>
  )
}

export default HomePage

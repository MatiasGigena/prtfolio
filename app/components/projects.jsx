'use client';
import Project from './project';
import { useState, useRef } from 'react';
import Modal from './modal';
import Description from './description';
import { motion, useInView } from 'framer-motion';
const Projects = () => {
  const [modal, setModal] = useState({
    active: false,
    index: 0,
  });
  const project = useRef(null);
  const isInView = useInView(project, { once: false });
  const animate = {
    initial: { opacity: 0 },
    open: {
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.2,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };
  const projects = [
    {
      title: 'Rekon',
      color: '#000',
      src: '/images/266shots_so.png',
      link: 'https://www.rekonmedia.com/',
      Description: 'Design & Development',
    },
    {
      title: 'Nexiafy',
      color: '#000',
      src: '/images/clipboard-image-1770985279.avif',
      link: 'https://nexiafy.useteam.io/',
      Description: 'Design & Development',
    },
    {
      title: 'Huntek',
      color: '#000',
      src: '/images/199shots_so.png',
      link: 'https://huntek-website.vercel.app/',
      Description: 'Design & Development & Interaction',
    },
    {
      title: '????',
      color: '#000',
      src: '/images/693shots_so.png',
      link: 'https://vercel.com/matiasgigena/pi-food-main-matias-gigena',
      Description: 'Time will tell . . .',
    },
  ];
  return (
    <div
      id='Work'
      className='flex flex-col  px-8 pb-16 z-40 gap-7 lg:pb-32 lg:pt-9 sm:gap-10 lg:px-10 lg:gap-24 items-start lg:items-center justify-start '
    >
      <Description />
      <motion.div
        ref={project}
        variants={animate}
        initial='initial'
        animate={isInView ? 'open' : 'initial'}
        className='flex flex-col gap-8 lg:flex-row lg:gap-0 justify-around  lg:w-full '
      >
        {projects.map((project, index) => {
          return (
            <Project
              key={index}
              index={index}
              link={project.link}
              Description={project.Description}
              title={project.title}
              setModal={setModal}
            />
          );
        })}
      </motion.div>
      <Modal modal={modal} projects={projects} />
    </div>
  );
};
export default Projects;

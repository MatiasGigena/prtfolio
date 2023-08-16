"use client";
import Project from "./project";
import { useState, useRef } from "react";
import Modal from "./modal";
import Description from "./description";
import { motion, useInView } from "framer-motion";
const Projects = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const project = useRef(null)
  const isInView = useInView(project, { once: false});
  const animate = {
    initial: {  opacity: 0 },
    open: { opacity: 1, transition: { duration: 1, delay: 0.4 , ease: [0.33, 1, 0.68, 1] } }
  };
  const projects = [
    {
      title: "Huntek",
      color: "#fff",
      src: "/images/huntek.png",
      link: "https://vercel.com/matiasgigena/pi-food-main-matias-gigena"
    },
    {
      title: "Silencio",
      color: "#8C8C8C",
      src: "/images/fpro.jpg",
      link: "https://vercel.com/matiasgigena/pi-food-main-matias-gigena"
    },
    {
      title: "Miralibres",
      color: "#EFE8D3",
      src: "https://picsum.photos/1920/1080",
      link: "https://vercel.com/matiasgigena/pi-food-main-matias-gigena"
    },
    {
      title: "E-Pay",
      color: "#706D63",
      src: "https://picsum.photos/1920/1080",
      link: "https://vercel.com/matiasgigena/pi-food-main-matias-gigena"
    },
  ];
  return (
    <div id="Work" className="flex flex-col mt-5 p-5 sm:mt-14 z-40 gap-10 xl:mb-36 xsm:mt-8 md:py-0 md:px-5 lg:p-0 lg:mt-10 items-start md:mt-24  xl:mt-20 lg:items-center justify-start h-screen ">
      <Description />
      <motion.div ref={project}
      variants={animate}
      initial="initial"
      animate={isInView ? "open" : "initial"} className="flex flex-col lg:flex-row gap-[55px] lg:gap-[2.5vw] lg:justify-center lg:px-3 xl:gap-12 xxl:gap-24 lg:w-full xl:px-3 xl:mt-20 mt-5 xsm:mt-10 sm:mt-14 md:mt-24">
        {projects.map((project, index) => {
          return <Project key={index} index={index} link={project.link} title={project.title} setModal={setModal} />;
        })}
      </motion.div>
      <Modal modal={modal} projects={projects} />
    </div>
  );
};
export default Projects;

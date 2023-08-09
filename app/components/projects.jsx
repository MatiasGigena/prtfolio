"use client";
import Project from "./project";
import { useState } from "react";
import Modal from "./modal";
import Description from "./description";
const Projects = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const projects = [
    {
      title: "Huntek",
      color: "#fff",
      src: "https://picsum.photos/1900/1080",
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
    <div id="About" className="flex flex-col mt-5 p-5 sm:mt-14 z-40 gap-10 xl:mb-36 xsm:mt-8 md:py-0 md:px-5 lg:p-0 lg:mt-10 items-start md:mt-24  xl:mt-20 lg:items-center justify-start h-screen ">
      <Description />
      <div className="flex flex-col lg:flex-row gap-[55px] lg:gap-[2.5vw] lg:justify-center lg:px-3 xl:gap-12 lg:w-full xl:px-3 xl:mt-20 mt-5 xsm:mt-10 sm:mt-14 md:mt-24">
        {projects.map((project, index) => {
          return <Project key={index} index={index} link={project.link} title={project.title} setModal={setModal} />;
        })}
      </div>
      <Modal modal={modal} projects={projects} />
    </div>
  );
};
export default Projects;

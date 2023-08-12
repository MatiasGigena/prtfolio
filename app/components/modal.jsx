"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap"
const scaleAnimation = {
  initial: {
    scale: 0, x: "-50%", y: "-50%",
  },
  open: {scale: 1, x: "-50%", y: "-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
  closed: {scale: 0, x: "-50%", y: "-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}
}
const Modal = ({ modal, projects }) => {
  const { active, index } = modal;
  const ref = useRef(null);
  const cursor = useRef(null)
  const cursorLabel = useRef(null)
  useEffect(() => {
    const moveContainerX = gsap.quickTo(ref.current, "left", {duration: 0.8, ease:"power3"});
    const moveContainerY = gsap.quickTo(ref.current, "top", {duration: 0.8, ease:"power3"}); 
    
    const moveCursorX = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease:"power3"});
    const moveCursorY = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease:"power3"});
    
    const moveCursorLabelX = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease:"power3"});
    const moveCursorLabelY = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease:"power3"});

    window.addEventListener("mousemove" , (e) => {
      const {clientX, clientY} = e
      moveContainerX(clientX)
      moveContainerY(clientY)
      moveCursorX(clientX)
      moveCursorY(clientY)
      moveCursorLabelX(clientX)
      moveCursorLabelY(clientY)
    })
  },[])
  return (
    <>
      <motion.div ref={ref} variants={scaleAnimation} initial={"initial"} animate={active ? "open" : "closed"} className="pointer-events-none h-[200px] w-[250px]  sm:h-[350px] sm:w-[400px] flex items-center justify-center fixed overflow-hidden">
        <div style={{ top: index * -100 + "%"}} className="h-full w-full absolute animacion ">
          {projects.map((project, index) => {
            const { src, color } = project;
            return (
              <div key={`modal_${index}`} style={{backgroundColor: color}} className="relative h-full flex items-center justify-center">
                <Image
                src={src}
                width={390}
                height={0}
                alt="image"
                className="h-auto"
                />
              </div>
            )
          })}
        </div>
      </motion.div>
      <motion.div ref={cursor} variants={scaleAnimation} initial={"initial"} animate={active ? "open" : "closed"} className="w-24 h-24 flex items-center fixed bg-black shadow-xl rounded-full pointer-events-none justify-center text-sec"></motion.div>
      <motion.div ref={cursorLabel} variants={scaleAnimation} initial={"initial"} animate={active ? "open" : "closed"} className="w-24 h-24 text-xl font-extralight flex items-center fixed bg-transparent rounded-full pointer-events-none justify-center text-sec">Lets go!</motion.div>
    </>
  );
};
export default Modal;

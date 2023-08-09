"use client"
import { useRef } from "react";
import { useInView, motion } from "framer-motion";
const MaskText = ({ phrases }) => {
  const main = useRef(null)
  const isInView = useInView(main, {once: true, margin: "-10%"})
  const animate = {
    initial: {y: "100%"},
    open: (i) => ({y : "0%", transition: {duration: 1, delay: 0.1 * i, ease:[0.33, 1, 0.68, 1] }})
  }
  
  return (
    <div ref={main} className="text-2xl">
      {phrases.map((p, index) => {
        return (
          <div key={index} className="overflow-hidden">
            <motion.p custom={index} variants={animate} initial="initial" animate={isInView ? "open" : ""} className="m-0 font-normal translate-y-[50%]">{p}</motion.p>
          </div>
        );
      })}
    </div>
  );
};
export default MaskText;

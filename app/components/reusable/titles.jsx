"use client";
import { useRef } from "react";
import { useInView, motion } from "framer-motion";
const MaskTitles = ({ phrases }) => {
  const main = useRef(null);
  const isInView = useInView(main, { once: false, margin: "-10%" });
  const animate = {
    initial: { y: "100%" },
    open: (i) => ({ y: "0%", transition: { duration: 1, delay: 0.1 * i, ease: [0.33, 1, 0.68, 1] } }),
  };

  return (
    <div ref={main} className={`px-2 text-lg flex flex-col justify-center items-center xsm:text-xl sm:text-2xl md:text-3xl xsm:px-3 sm:px-4 md:px-6 xl:w-[80rem] xl:px-0 space-y-20`}>
      {phrases.map((p, index) => {
        const parts = p.split(/({{.*?}})/);
        return (
          <div key={index} className="overflow-hidden lg:h-52 flex items-center">
            <motion.p
              custom={index}
              variants={animate}
              initial="initial"
              animate={isInView ? "open" : ""}
              className="m-0 w-fit font-normal translate-y-[50%]"
            >
              {parts.map((part, partIndex) => {
                if (part.startsWith("{{") && part.endsWith("}}")) {
                  const text = part.substring(2, part.length - 2);
                  const colorClass = partIndex % 2 === 0 ? "text-white" : "text-white font-bold text-4xl xsm:text-6xl xs:text-[3.5rem] xsm:text-6xl sm:text-8xl md:text-[7rem] lg:text-[9.5rem] xl:text-[12rem] xxl:text-[13rem]";
                  return (
                    <span key={partIndex} className={colorClass}>
                      {text}
                    </span>
                  );
                }
                return part;
              })}
            </motion.p>
          </div>
        );
      })}
    </div>
  );
};
export default MaskTitles;
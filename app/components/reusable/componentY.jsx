"use client"
import { useRef } from "react";
import { useInView, motion } from "framer-motion";

const MaskComponentY = ({ components }) => {
  const main = useRef(null);
  const isInView = useInView(main, { once: false, margin: "-10%" });
  const animate = {
    initial: { scale:0, transition: {duration: 1} },
    open: (i) => ({
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.1 * i,
        ease: [0.33, 1, 0.68, 1],
      },
    }),
};

  return (
    <div ref={main}>
      {components.map((Component, index) => {
        return (
          <div key={index} className="overflow-hidden">
            <motion.div
              custom={index}
              variants={animate}
              initial="initial"
              animate={isInView ? "open" : "initial"}
            >
              <Component />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default MaskComponentY;
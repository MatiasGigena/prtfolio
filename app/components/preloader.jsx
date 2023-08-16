"use client"
import { useState, useEffect } from "react";
import { slideUp } from "../animations/anim";
import { motion } from "framer-motion";
import AnimationIcon from '@mui/icons-material/Animation';
const Preloader = () => {
  const [nbOfBlocks, setNbOfBlocks] = useState(0);

  useEffect(() => {
    const blockSize = window.innerWidth * 0.05;
    const blocks = Math.ceil(window.innerHeight / blockSize);
    setNbOfBlocks(blocks);
  }, []);

  const getBlocks = () => {
    return [...Array(nbOfBlocks).keys()].map((_, index) => {
      return (
        <div onMouseEnter={(e) => colorize(e)} key={index} className="w-full rounded-2xl h-[5vw]"></div>
      );
    });
  };
  const colorize = (e) => {
    e.target.style.backgroundColor = "white";
    setTimeout(() => {
      e.target.style.backgroundColor = "transparent"
    }, 300)
  }
  
  return (
    <motion.div variants={slideUp} initial="initial" exit="exit" className="min-h-screen fixed w-full  bg-black top-0 left-0 z-50 text-white flex items-center justify-center">
      <p className="flex flex-col items-center w-full"><span className="font-bold text-4xl mr-2 ">Get creative!</span> <span className="flex text-2xl font-thin gap-3">Matias Gigena <AnimationIcon className="animate-spin" style={{ fontSize: "2rem" }}/></span> </p>
      <div className="absolute w-full h-full flex ">
        {
          [...Array(20).keys()].map((_, index) => {
            return <div key={index} className="w-[5vw] rounded-2xl h-full"> 
            {
              getBlocks()
            }
            </div>
          })
        }
      </div>
    </motion.div>
  );
};
export default Preloader;

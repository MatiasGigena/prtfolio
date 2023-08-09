"use client";
import Image from "next/image";
import { useTransform, useScroll, motion } from "framer-motion";
import { useRef, useEffect } from "react";
import useDimension from "@/hooks/useDimension";
const AboutPage = () => {
  const { height } = useDimension();
  const ref = useRef(null);
  const myImages = [
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/wordpress/wordpress-plain.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-plain.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-line.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/sequelize/sequelize-original.svg",
    "https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg",
    "https://www.vectorlogo.zone/logos/w3_css/w3_css-icon.svg",
    "https://www.vectorlogo.zone/logos/framer/framer-icon.svg",
    "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",
    "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
    "https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg",
    "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
    "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
    "/images/greensock-gsap-icon-seeklogo.com.svg",
  ];
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 2.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 2.5]);
  return (
    <div className="min-h-screen w-full bg-white text-sec flex flex-col justify-center items-center">
      <div ref={ref} className="h-[170vh] flex  overflow-hidden gap-[6vw] p-[2vw] box-border">
        <Column
          myImages={[myImages[0], myImages[1], myImages[2], myImages[3], myImages[4], myImages[5]]}
          y={y}
        />
        <Column
          myImages={[myImages[6], myImages[7], myImages[8], myImages[9], myImages[10], myImages[11]]} y={y2}
        />
        <Column
          myImages={[myImages[12], myImages[13], myImages[14], myImages[15], myImages[16], myImages[17]]} y={y3}
        />
      </div>
    </div>
  );
};
export default AboutPage;

const Column = ({ myImages, y = 0 }) => {
  return (
    <motion.div style={{ y }} className="w-1/3 h-full column relative flex flex-col gap-[2vw] min-w-[100px] sm:min-w-[250px]">
      {myImages.map((src, index) => {
        return (
          <div key={index} className="h-full grid  place-items-center w-full relative">
            <Image src={src} height="100" width="100" alt="logo" loading="eager" className="object-cover" />
          </div>
        );
      })}
    </motion.div>
  );
};

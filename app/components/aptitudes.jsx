"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";

const Aptitudes = () => {
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  const plane4 = useRef(null);
  let requestAnimationFrameId = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e) => {
    const { movementX, movementY } = e
    xForce += movementX * speed;
    yForce += movementY * speed;

    if(requestAnimationFrameId == null){
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  }

  const lerp = (start, target, amount) => start * (1 - amount) +target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, {x: `+=${xForce *0.4}`, y: `+=${yForce * 0.4}`})
    gsap.set(plane2.current, {x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}`})
    gsap.set(plane3.current, {x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}`})
    gsap.set(plane4.current, {x: `+=${xForce * 0.6}`, y: `+=${yForce * 0.6}`})

    if(Math.abs(xForce) < 0.01) xForce = 0;
    if(Math.abs(yForce) < 0.01) yForce = 0;
    
    if(xForce != 0 || yForce != 0){
      requestAnimationFrame(animate);
    }
    else{
      cancelAnimationFrame(requestAnimationFrameId)
      requestAnimationFrameId = null;
    }
  }

  return (
    <div
      onMouseMove={(e) => {
        manageMouseMove(e);
      }}
      className="h-screen relative w-full mt-28  text-black">
      <div ref={plane1} className="plane">
        <Image
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg"
          alt="JavaScript"
          width="70"
          height="70"
          loading="eager"
        />
        <Image
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"
          alt="JavaScript"
          width="70"
          height="70"
          loading="eager"
        />
        <Image
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/wordpress/wordpress-plain.svg"
          alt="JavaScript"
          width="70"
          height="70"
          loading="eager"
        />
      </div>
      <div ref={plane2} className="plane">
        <Image
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg"
          alt="JavaScript"
          width="70"
          height="70"
          loading="eager"
        />
        <Image src="https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg" alt="HTML" width="70" height="70"
        loading="eager" />
        <Image src="https://www.vectorlogo.zone/logos/w3_css/w3_css-icon.svg" alt="CSS" width="70" height="70"
        loading="eager" />
      </div>
      <div ref={plane3} className="plane">
        <Image
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-plain.svg"
          alt="CSS"
          width="70"
          height="70"
          loading="eager"
        />
        <Image
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
          alt="React"
          width="70"
          height="70"
          loading="eager"
        />
        <Image src="https://www.vectorlogo.zone/logos/framer/framer-icon.svg" alt="Framer" width="70" height="70"
        loading="eager" />
      </div>
      <div ref={plane4} className="plane2">
        <Image
          src="/images/greensock-gsap-icon-seeklogo.com.svg"
          alt="Framer"
          width="70"
          height="70"
          loading="eager"
          className="image-1"
        />
        <Image
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg"
          alt="Redux"
          width="70"
          height="70"
          loading="eager"
          className="image-2"
        />

        <Image
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-line.svg"
          alt="Next"
          width="70"
          height="70"
          loading="eager"
          className="image-3"
        />
        <Image
          src="https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg"
          alt="Node"
          width="70"
          height="70"
          loading="eager"
          className="image-4"
        />

        <Image
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg"
          alt="Express"
          width="70"
          height="70"
          loading="eager"
          className="image-5"
        />

        <Image
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sequelize/sequelize-original.svg"
          alt="Sequelize"
          width="70"
          height="70"
          loading="eager"
          className="image-6"
        />

        <Image
          src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
          alt="Tailwind"
          width="70"
          height="70"
          loading="eager"
          className="image-7"
        />
        <Image
          src="https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg"
          alt="PostgreSQL"
          width="70"
          height="70"
          loading="eager"
          className="image-8"
        />
        <Image
          src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg"
          alt="Postman"
          width="70"
          height="70"
          loading="eager"
          className="image-9"
        />
        <Image
          src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg"
          alt="GitFlow"
          width="70"
          height="70"
          loading="eager"
          className="image-10"
        />
      </div>
      <div className=" w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-4xl text-black">My tech stack</h1>
        <p className="opacity-70 text-black">Not just front-end.</p>
      </div>
    </div>
  );
};
export default Aptitudes;

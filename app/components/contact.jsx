"use client"
import Magnetic from "./reusable/Magnetic";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useForm, ValidationError,  } from "@formspree/react";
const Contact = () => {
  const [state, handleSubmit] = useForm("mjvqyner");
  console.log(state)
  if (state.succeeded) {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}
  const container = useRef(null)
  const about = useRef(null)
  const about2 = useRef(null)
  const about3 = useRef(null)
  const ref2 = useRef(null)
  const ref = useRef(null)
  const isInView = useInView(about, { once: false});
  const isInView2 = useInView(about2, { once: false});
  const isInView3 = useInView(container, { once: false});
  const isInView4 = useInView(ref, { once: false});
  const isInView5 = useInView(ref2, { once: false});
  const animate = {
    initial: { x: "-100%", opacity: 0 },
    open: ({ x: "0%", opacity: 1, transition: { duration: 1.2, delay: 0.6 , ease: [0.33, 1, 0.68, 1] } }),
  };
  const animate2 = {
    initial: { x: "100%", opacity: 0 },
    open: ({ x: "0%", opacity: 1, transition: { duration: 1.2, delay: 0.8 , ease: [0.33, 1, 0.68, 1] } }),
  };
  const animate3 = {
    initial: { y: "100%", opacity: 0 },
    open: ({ y: "0%", opacity: 1, transition: { duration: 1.2, delay: 1, ease: [0.33, 1, 0.68, 1] } }),
  };
  const animate4 = {
    initial: {  opacity: 0 },
    open: ({  opacity: 1, transition: { duration: 1.2, delay: 0.1 , ease: [0.33, 1, 0.68, 1] } }),
  }; 
  const animate5 = {
    initial: {  opacity: 0 },
    open: ({  opacity: 1, transition: { duration: 1.2, delay: 0.3 , ease: [0.33, 1, 0.68, 1] } }),
  }; 
  const loader = {
    initial: {
      clipPath: "circle(0%)",
    },
    open: {
      clipPath: "circle(125%)",
      backgroundColor: "#000",
      transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
    },
  };
  
  return (
    <motion.section ref={container} initial="initial" variants={loader} animate={isInView3 ? "open" : ""} className="text-gray-600 lg:border-0 lg:rounded-b-full lg:border-b-2 border-2 w-full mt-60 lg:mt-0 body-font relative">
    <div className="container px-5 border-0 lg:pt-11 lg:pb-4 pt-6 pb-3 mx-auto">
      <div className="flex flex-col text-center w-full mb-12">
        <motion.h1 ref={ref} initial="initial" variants={animate4} animate={isInView4 ? "open" : ""} className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Drop me an email.</motion.h1>
        <motion.p ref={ref2} initial="initial" variants={animate5} animate={isInView5 ? "open" : ""} className="lg:w-2/3 mx-auto text-white leading-relaxed text-base">I hope you've found inspiration along the way. Let&apos;s connect.</motion.p>
      </div>
      <div className="lg:w-1/2 md:w-2/3 mx-auto">
        <div >
          <form onSubmit={handleSubmit}className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="name" className="leading-7 text-sm text-white">Name</label>
                <motion.input ref={about} initial="initial" variants={animate} required animate={isInView ? "open" : ""} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="email" className="leading-7 text-sm text-white">Email</label>
                <motion.input ref={about2} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required initial="initial" variants={animate2} animate={isInView2? "open" : ""} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label htmlFor="message" className="leading-7 text-sm text-white">Message</label>
                <motion.textarea ref={about3} initial="initial" required variants={animate3} animate={isInView ? "open" : ""} id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></motion.textarea>
              </div>
            </div>
            <div className="p-2 w-full">
              <Magnetic><button type="submit" disabled={state.submitting} className="flex hvr-radial-out mx-auto bg-white text-black border-2 py-2 px-8 rounded text-lg">Send</button></Magnetic>
            </div>
          </form>
          <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
            <a className="text-white">matias.gigena7@outlook.es</a>
            <p className="leading-normal my-5">Agronomía, C15.  
              <br/>Ciudad Autónoma de Buenos Aires.
            </p>
            <span className="inline-flex items-center">
              <Magnetic>
                <a href="https://www.facebook.com/profile.php?id=100009688898482" target="_blank" className="text-white">
                  <svg fill="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="https://www.linkedin.com/in/matias-gigena-7bk/" target="_blank" className="ml-4 text-white">
                 <LinkedInIcon/>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="https://www.instagram.com/matiasgigena_/" target="_blank" className="ml-4 text-white">
                  <svg fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="https://api.whatsapp.com/send/?phone=541121795715&text&type=phone_number&app_absent=0" target="_blank" className="ml-4 text-white">
                  <WhatsAppIcon/>
                </a>
              </Magnetic>
            </span>
          </div>
        </div>
      </div>
    </div>
  </motion.section>
  );
};
export default Contact;

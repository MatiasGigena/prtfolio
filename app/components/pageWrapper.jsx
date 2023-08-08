"use client"
import { motion } from "framer-motion"
const PageWrapper = ({ children }) => {
  return (
    <motion.div initial={{ y:"-210vh"}} exit={{  y:"-100vh"}} animate={{  y:"0", transition: {delay: 0.3, duration:1}}} className="min-h-screen">
      {children}
    </motion.div>
  )
}
export default PageWrapper
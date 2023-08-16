export const slideUp = {
  initial: {
    y: "0",
  },
  exit: {
    y: "-100vh",
    transition: { duration: 1.2, ease: [0.68, -0.6, 0.32, 1.6], delay: 0.2 },
  },
};
export const slideRight = {
  initial: {
    x: "0",
  },
  exit: {
    x: "-100vw",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};



export const slideUp = {
  initial: {
    clipPath: "circle(125%)",
  },
  exit: {
    clipPath: "circle(0%)",
    transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
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



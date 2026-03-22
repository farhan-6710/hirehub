// src/animations/index.ts

// Animation variants
export const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 2.5, delay: 0.8 } },
};

export const fadeSlideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.4 } },
};

export const fadeSlideDown1 = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0 } },
};

export const fadeSlideDown2 = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.4 } },
};

export const fadeSlideUp2 = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.8 } },
};

export const fadeSlideRight = {
  hidden: { opacity: 0, x: -125 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 1.2 } },
};

export const fadeSlideLeft1 = {
  hidden: { opacity: 0, x: 125 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export const fadeSlideLeft2 = {
  hidden: { opacity: 0, x: 125 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 1.2 } },
};

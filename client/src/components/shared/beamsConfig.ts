export interface BeamOptions {
  initialX?: number;
  translateX?: number;
  initialY?: number;
  translateY?: number;
  rotate?: number;
  className?: string;
  duration?: number;
  delay?: number;
  repeatDelay?: number;
}

// Positions and timings for the falling beams behind the hero.
export const BEAMS: BeamOptions[] = [
  {
    initialX: 10,
    translateX: 10,
    duration: 7,
    repeatDelay: 3,
    delay: 2,
  },
  {
    initialX: 240,
    translateX: 240,
    duration: 7,
    repeatDelay: 4,
    delay: 3,
    className: "h-20",
  },
  {
    initialX: 300,
    translateX: 300,
    duration: 7,
    repeatDelay: 5,
    delay: 5,
  },
  {
    initialX: 600,
    translateX: 600,
    duration: 3,
    repeatDelay: 3,
    delay: 4,
  },
  {
    initialX: 100,
    translateX: 100,
    duration: 7,
    repeatDelay: 7,
    className: "h-6",
  },
  {
    initialX: 400,
    translateX: 400,
    duration: 5,
    repeatDelay: 14,
    delay: 4,
  },
  {
    initialX: 800,
    translateX: 800,
    duration: 11,
    repeatDelay: 2,
    className: "h-20",
  },
  {
    initialX: 1000,
    translateX: 1000,
    duration: 4,
    repeatDelay: 2,
    className: "h-12",
  },
  {
    initialX: 1100,
    translateX: 1100,
    duration: 5,
    repeatDelay: 3,
    delay: 2,
    className: "h-16",
  },
  {
    initialX: 1200,
    translateX: 1200,
    duration: 7,
    repeatDelay: 4,
    delay: 2,
    className: "h-16",
  },
  {
    initialX: 1300,
    translateX: 1300,
    duration: 4,
    repeatDelay: 3,
    delay: 2,
    className: "h-12",
  },
  {
    initialX: 1400,
    translateX: 1410,
    duration: 7,
    repeatDelay: 3,
    delay: 2,
  },
  {
    initialX: 1640,
    translateX: 1640,
    duration: 7,
    repeatDelay: 4,
    delay: 3,
    className: "h-20",
  },
  {
    initialX: 1840,
    translateX: 1840,
    duration: 7,
    repeatDelay: 2,
    delay: 0,
    className: "h-20",
  },
];

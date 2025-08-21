import { gsap } from 'gsap';

// Register GSAP plugins if needed
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Common animation configurations
export const fadeInUp = {
  opacity: 0,
  y: 30,
  duration: 0.6,
  ease: "power2.out"
};

export const fadeInDown = {
  opacity: 0,
  y: -30,
  duration: 0.6,
  ease: "power2.out"
};

export const fadeInLeft = {
  opacity: 0,
  x: -30,
  duration: 0.6,
  ease: "power2.out"
};

export const fadeInRight = {
  opacity: 0,
  x: 30,
  duration: 0.6,
  ease: "power2.out"
};

export const scaleIn = {
  opacity: 0,
  scale: 0.8,
  duration: 0.6,
  ease: "back.out(1.7)"
};

// Utility functions
export const staggerChildren = (delay: number = 0.1) => ({
  stagger: delay,
  ease: "power2.out"
});

export const createTimeline = () => gsap.timeline();

// Export gsap for direct use
export { gsap }; 
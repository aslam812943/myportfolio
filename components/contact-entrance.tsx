"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

export function ContactEntrance({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 82,
    damping: 24,
    mass: 0.72,
  });
  const horizontalShift = useTransform(
    smoothProgress,
    [0, 0.86, 1],
    ["100vw", "0vw", "0vw"],
  );

  return (
    <section
      ref={sectionRef}
      className="contact chapter"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-sticky-stage">
        <div className="contact-intro" aria-hidden="true">
          <span>05 / LET&apos;S CREATE</span>
          <p>IT STARTS WITH<br />A CONVERSATION.</p>
        </div>
        <motion.div className="contact-slide-panel" style={reduced ? undefined : { x: horizontalShift }}>
          <div className="contact-content section-shell">{children}</div>
        </motion.div>
      </div>
    </section>
  );
}

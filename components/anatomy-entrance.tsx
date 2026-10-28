"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

export function AnatomyEntrance({ children }: { children: ReactNode }) {
  const reduced = useHydratedReducedMotion();
  return <div className="anatomy-transition-backdrop"><motion.section
    className="anatomy section-shell anatomy-entrance"
    aria-labelledby="anatomy-title"
    initial={reduced ? false : { opacity: .65, y: 90, scale: .985 }}
    whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: .12 }}
    transition={{ duration: .95, ease: [0.22, 1, 0.36, 1] }}
  >{children}</motion.section></div>;
}

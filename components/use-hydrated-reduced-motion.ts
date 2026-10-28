"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export function useHydratedReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted && Boolean(prefersReducedMotion);
}

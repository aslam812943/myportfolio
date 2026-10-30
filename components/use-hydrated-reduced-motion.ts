"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

const subscribeNoop = () => () => {};

export function useHydratedReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  // false on the server and during hydration, true afterwards (no extra effect + re-render).
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  return mounted && Boolean(prefersReducedMotion);
}

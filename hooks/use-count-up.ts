"use client";

import { useEffect, useState } from "react";

export function useCountUp(target: number, reduced: boolean, duration = 700) {
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min(1, (now - start) / duration);
      setValue(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, reduced, duration]);

  return (reduced ? target : value).toFixed(Number.isInteger(target) ? 0 : 1);
}

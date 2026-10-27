"use client";

import { useEffect, useState } from "react";

export function useTypewriter(lines: readonly [string, string], reduced: boolean) {
  const [count, setCount] = useState(0);
  const total = lines[0].length + lines[1].length;

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => {
      setCount((current) => {
        if (current >= total) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, 38);
    return () => window.clearInterval(timer);
  }, [reduced, total]);

  const visible = reduced ? total : count;
  return {
    first: lines[0].slice(0, visible),
    second: lines[1].slice(0, Math.max(0, visible - lines[0].length)),
  };
}

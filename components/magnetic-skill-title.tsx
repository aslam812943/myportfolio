"use client";
import { useRef } from "react";
import type { PointerEvent } from "react";

export function MagneticSkillTitle({ text }: { text: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const move = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.current?.querySelectorAll<HTMLElement>("i").forEach((letter) => {
      const box = letter.getBoundingClientRect();
      const dx = box.left + box.width / 2 - event.clientX;
      const dy = box.top + box.height / 2 - event.clientY;
      const amount = Math.max(0, 1 - Math.hypot(dx, dy) / 110);
      letter.style.transform = `translate3d(${(dx * amount * .13).toFixed(1)}px,${(dy * amount * .13).toFixed(1)}px,0)`;
      letter.style.textShadow = amount ? `1px 0 rgba(150,200,180,${amount * .6}),-1px 0 rgba(170,155,205,${amount * .5})` : "";
    });
  };
  const reset = () => root.current?.querySelectorAll<HTMLElement>("i").forEach((letter) => { letter.style.transform = ""; letter.style.textShadow = ""; });
  return <span ref={root} className="magnetic-skill-title" aria-label={text} onPointerMove={move} onPointerLeave={reset}>{Array.from(text).map((letter, index) => <i aria-hidden="true" key={index}>{letter === " " ? "\u00a0" : letter}</i>)}</span>;
}

"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent } from "react";
import type { BuildItem } from "./behind-the-build-items";
import { useTypewriter } from "@/hooks/use-typewriter";
import { useCountUp } from "@/hooks/use-count-up";

type Props = { item: BuildItem; activeIndex: number; cycle: number; paused: boolean; reduced: boolean };

function PreviewContent({ item, reduced }: { item: BuildItem; reduced: boolean }) {
  const typed = useTypewriter(item.term, reduced);
  const count = useCountUp(item.stat.value, reduced);
  return (
    <motion.div
      className="behind-preview-content"
      initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }}
      animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }}
      exit={{ opacity: 0, transition: { duration: reduced ? .15 : .12 } }}
      transition={reduced ? { duration: .15 } : { duration: .55, ease: [.7, 0, .2, 1] }}
    >
      <span className="behind-preview-number" aria-hidden="true">{item.n}</span>
      <svg className="behind-preview-art" viewBox="0 0 110 72" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        {item.shapes.map((shape, index) => {
          const draw = { initial: reduced ? false : { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: reduced ? 0 : .9, delay: reduced ? 0 : .15 } };
          switch (shape.kind) {
            case "rect": return <motion.rect key={index} x={shape.x} y={shape.y} width={shape.width} height={shape.height} {...draw} />;
            case "line": return <motion.line key={index} x1={shape.x1} y1={shape.y1} x2={shape.x2} y2={shape.y2} {...draw} />;
            case "ellipse": return <motion.ellipse key={index} cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} {...draw} />;
            case "circle": return <motion.circle key={index} cx={shape.cx} cy={shape.cy} r={shape.r} {...draw} />;
            case "path": return <motion.path key={index} d={shape.d} {...draw} />;
          }
        })}
        {item.pulse && !reduced && <motion.circle cx={item.pulse.cx} cy={item.pulse.cy} fill="currentColor" stroke="none" initial={{ r: 3, opacity: .9 }} animate={{ r: [3, 12], opacity: [.9, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }} />}
        {item.pulse && reduced && <circle cx={item.pulse.cx} cy={item.pulse.cy} r="3" fill="currentColor" stroke="none" />}
      </svg>
      <div className="behind-terminal" aria-hidden="true">
        <div><span>&gt;</span> {typed.first}<i className="behind-terminal-cursor" /></div>
        <div><span>&lt;</span> {typed.second}</div>
      </div>
      <div className="behind-preview-bottom">
        <div className="behind-preview-detail">
          <h3>{item.title}</h3>
          <div className="behind-preview-tags" role="region" tabIndex={0} aria-label={`${item.title} skills: ${item.tags.join(", ")}`}>
            <div className="behind-preview-tags-track">
              <div className="behind-preview-tag-group">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="behind-preview-tag-group" aria-hidden="true">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </div>
        </div>
        <div className="behind-preview-stat" aria-hidden="true"><strong>{count}{item.stat.suffix}</strong><span>{item.stat.label}</span></div>
      </div>
      <span className="sr-only">{item.term.join(". ")}. {item.stat.value}{item.stat.suffix} {item.stat.label}.</span>
    </motion.div>
  );
}

export function BehindTheBuildPreview({ item, activeIndex, cycle, paused, reduced }: Props) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothX = useSpring(rotateX, { stiffness: 160, damping: 22 });
  const smoothY = useSpring(rotateY, { stiffness: 160, damping: 22 });
  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - .5) * 8);
    rotateX.set(-((event.clientY - rect.top) / rect.height - .5) * 8);
  };

  return (
    <div className="behind-preview-perspective">
      <motion.div className="behind-preview" style={{ rotateX: smoothX, rotateY: smoothY }} onPointerMove={tilt} onPointerLeave={() => { rotateX.set(0); rotateY.set(0); }} aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <PreviewContent key={activeIndex} item={item} reduced={reduced} />
        </AnimatePresence>
        {!reduced && !paused && <motion.div key={`${activeIndex}-${cycle}`} className="behind-preview-progress" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 26, ease: "linear" }} aria-hidden="true" />}
      </motion.div>
    </div>
  );
}

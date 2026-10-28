"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";
import { ITEMS } from "./behind-the-build-items";
import { BehindTheBuildPreview } from "./behind-the-build-preview";
import { BehindTheBuildRow } from "./behind-the-build-row";

export function BehindTheBuild() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cycle, setCycle] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const reduced = useHydratedReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const smoothX = useSpring(x, { stiffness: 90, damping: 24 });
  const smoothY = useSpring(y, { stiffness: 90, damping: 24 });
  const paused = isHovering || !isPlaying || !isVisible;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: .1 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const timer = window.setTimeout(() => setActiveIndex((index) => (index + 1) % ITEMS.length), 26000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, cycle, paused, reduced]);

  const resume = () => { setIsHovering(false); setCycle((value) => value + 1); };
  const moveSpotlight = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - 240);
    y.set(event.clientY - rect.top - 240);
  };
  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === "ArrowDown" || event.key === "ArrowRight" ? (index + 1) % ITEMS.length
      : event.key === "ArrowUp" || event.key === "ArrowLeft" ? (index - 1 + ITEMS.length) % ITEMS.length
      : event.key === "Home" ? 0 : event.key === "End" ? ITEMS.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    setActiveIndex(next);
    listRef.current?.querySelectorAll<HTMLButtonElement>(".behind-row")[next]?.focus();
  };
  const select = (index: number) => { setActiveIndex(index); setCycle((value) => value + 1); };
  const toggle = (index: number) => { select(index); setOpenIndex((current) => current === index ? null : index); };

  return (
    <section
      ref={sectionRef}
      className="expertise behind-build chapter section-shell"
      id="expertise"
      aria-labelledby="expertise-title"
      onPointerMove={moveSpotlight}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setIsHovering(true); }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") resume(); }}
      onFocusCapture={() => setIsHovering(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) resume(); }}
    >
      {!reduced && <motion.div className="behind-spotlight" style={{ x: smoothX, y: smoothY }} aria-hidden="true" />}
      <div className="behind-left">
        <div className="behind-heading">
          <div className="behind-heading-top"><p className="behind-eyebrow">03 / BEHIND THE BUILD</p><button type="button" className="behind-play-button" onClick={() => { setIsPlaying((playing) => !playing); setCycle((value) => value + 1); }} aria-label={isPlaying ? "Pause preview autoplay" : "Play preview autoplay"}>{isPlaying ? "PAUSE" : "PLAY"}</button></div>
          <h2 id="expertise-title">BEHIND<br />THE <em>BUILD.</em></h2>
        </div>
        <div className="behind-preview-wrap">
          <BehindTheBuildPreview item={ITEMS[activeIndex]} activeIndex={activeIndex} cycle={cycle} paused={paused} reduced={reduced} />
          <div className="behind-preview-nav" aria-label="Preview selection">
            <div className="behind-preview-dots">{ITEMS.map((item, index) => <button key={item.n} type="button" className="behind-preview-dot" data-active={activeIndex === index} aria-label={`Preview ${item.title}`} aria-current={activeIndex === index ? "true" : undefined} onClick={() => select(index)} />)}</div>
            <span className="behind-preview-counter">{String(activeIndex + 1).padStart(2, "0")} / {String(ITEMS.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
      <div ref={listRef} className="behind-list">
        {ITEMS.map((item, index) => <BehindTheBuildRow key={item.n} item={item} index={index} active={activeIndex === index} open={openIndex === index} reduced={reduced} onPreview={select} onToggle={toggle} onNavigate={navigate} />)}
        <p className="behind-list-hint">HOVER TO PREVIEW / CLICK TO EXPAND / ARROW KEYS TO NAVIGATE</p>
      </div>
    </section>
  );
}

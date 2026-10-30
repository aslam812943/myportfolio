"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";
import { ITEMS } from "./behind-the-build-items";
import { BehindTheBuildPreview } from "./behind-the-build-preview";
import { BehindTheBuildRow } from "./behind-the-build-row";

// How long each skill group stays in the preview before autoplay moves on (was 26 s, so most visitors only ever saw the first one).
export const AUTOPLAY_MS = 9000;
const subscribeNoop = () => () => {};

export function BehindTheBuild() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cycle, setCycle] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  // Set once the section is first seen: the preview "boots" (typing, count-up) and the skill tags stagger in.
  const [started, setStarted] = useState(false);
  // True only after hydration, so the server HTML always shows the skill tags.
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const reduced = useHydratedReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const smoothX = useSpring(x, { stiffness: 90, damping: 24 });
  const smoothY = useSpring(y, { stiffness: 90, damping: 24 });
  const paused = isHovering || !isPlaying || !isVisible;
  // Skill tags are only hidden for their entrance once JavaScript is running, so they never stay invisible.
  const motionReady = hydrated && !reduced;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
      if (entry.isIntersecting) setStarted(true);
    }, { threshold: .1 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const timer = window.setTimeout(() => setActiveIndex((index) => (index + 1) % ITEMS.length), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, cycle, paused, reduced]);

  useEffect(() => () => {
    if (audioContextRef.current) void audioContextRef.current.close();
  }, []);

  const playCyberClick = (kind: "select" | "transport" = "select") => {
    try {
      const context = audioContextRef.current?.state === "closed"
        ? new AudioContext()
        : audioContextRef.current ?? new AudioContext();
      audioContextRef.current = context;
      if (context.state === "suspended") void context.resume().catch(() => {});
      const start = context.currentTime;

      const voices = kind === "transport"
        ? [
            { type: "sine" as OscillatorType, from: 520, to: 920, volume: 0.033, duration: 0.17 },
            { type: "triangle" as OscillatorType, from: 1040, to: 1480, volume: 0.015, duration: 0.2 },
          ]
        : [
            { type: "triangle" as OscillatorType, from: 880, to: 440, volume: 0.032, duration: 0.11 },
            { type: "sine" as OscillatorType, from: 1480, to: 760, volume: 0.015, duration: 0.14 },
          ];

      for (const voice of voices) {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = voice.type;
        oscillator.frequency.setValueAtTime(voice.from, start);
        oscillator.frequency.exponentialRampToValueAtTime(voice.to, start + voice.duration);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(voice.volume, start + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + voice.duration);
        oscillator.connect(gain).connect(context.destination);
        oscillator.start(start);
        oscillator.stop(start + voice.duration);
      }
    } catch {
      // Audio can be unavailable or blocked; the controls still work normally.
    }
  };

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
  const toggle = (index: number) => { playCyberClick(); select(index); setOpenIndex((current) => current === index ? null : index); };

  return (
    <section
      ref={sectionRef}
      className={`expertise behind-build chapter section-shell${motionReady ? " motion-ready" : ""}${started ? " is-revealed" : ""}`}
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
          <div className="behind-heading-top"><p className="behind-eyebrow">03 / BEHIND THE BUILD</p><button type="button" className="behind-play-button" onClick={() => { playCyberClick("transport"); setIsPlaying((playing) => !playing); setCycle((value) => value + 1); }} aria-label={isPlaying ? "Pause preview autoplay" : "Play preview autoplay"}>{isPlaying ? "PAUSE" : "PLAY"}</button></div>
          <h2 id="expertise-title">BEHIND<br />THE <em>BUILD.</em></h2>
        </div>
        <div className="behind-preview-wrap">
          <BehindTheBuildPreview item={ITEMS[activeIndex]} activeIndex={activeIndex} cycle={cycle} paused={paused} reduced={reduced} started={started} autoplayMs={AUTOPLAY_MS} />
          <div className="behind-preview-nav" aria-label="Preview selection">
            <div className="behind-preview-dots">{ITEMS.map((item, index) => <button key={item.n} type="button" className="behind-preview-dot" data-active={activeIndex === index} aria-label={`Preview ${item.title}`} aria-current={activeIndex === index ? "true" : undefined} onClick={() => { playCyberClick(); select(index); }} />)}</div>
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

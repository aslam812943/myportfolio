"use client";

import { useEffect, useRef, useState } from "react";
import { INTRO_SEEN_KEY } from "./intro-config";

const name = "MUHAMMAD ASLAM";

/*
 * The intro is timed entirely in CSS (see "Intro + hero choreography" in globals.css), so it leaves
 * on schedule even while JavaScript is still loading on a slow phone, and the hero headline rises
 * as it fades. This component only locks scrolling while it is on screen, remembers that the visitor
 * has seen it this session, and removes it from the page afterwards.
 */
export function PortfolioIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const overlay = ref.current;
    try { sessionStorage.setItem(INTRO_SEEN_KEY, "1"); } catch { /* storage can be blocked */ }
    if (!overlay || root.classList.contains("intro-skip") || getComputedStyle(overlay).visibility === "hidden") {
      setDone(true);
      return;
    }

    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      root.style.overflow = previousOverflow;
      setDone(true);
    };
    const onStart = (event: AnimationEvent) => {
      if (event.animationName === "intro-exit") root.style.overflow = previousOverflow;
    };
    const onEnd = (event: AnimationEvent) => {
      if (event.animationName === "intro-exit") finish();
    };
    overlay.addEventListener("animationstart", onStart);
    overlay.addEventListener("animationend", onEnd);
    // Safety net in case animation events never fire (e.g. a background tab).
    const fallback = window.setTimeout(finish, 2600);
    return () => {
      overlay.removeEventListener("animationstart", onStart);
      overlay.removeEventListener("animationend", onEnd);
      window.clearTimeout(fallback);
      root.style.overflow = previousOverflow;
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={ref}
      className="portfolio-intro"
      style={{ position: "fixed", inset: 0, zIndex: 1000, display: "grid", placeItems: "center", background: "#101214", color: "#f4f2ed" }}
      role="status"
      aria-label="Loading portfolio"
    >
      <span
        className="portfolio-intro-name"
        style={{ display: "flex", alignItems: "baseline", justifyContent: "center", maxWidth: "calc(100vw - 40px)", overflow: "hidden", font: "600 clamp(2rem, 8vw, 9rem)/1 'Space Grotesk', Arial, sans-serif", letterSpacing: "-.035em", whiteSpace: "nowrap" }}
        aria-hidden="true"
      >
        {[...name].map((letter, index) => (
          letter === " "
            ? <span className="portfolio-intro-space" key={index} style={{ flex: "0 0 .28em" }} />
            : <span className="portfolio-intro-letter" key={index} style={{ animationDelay: `${index * 34}ms` }}>{letter}</span>
        ))}
        <span className="portfolio-intro-dot" aria-hidden="true">.</span>
      </span>
      <span className="portfolio-intro-bar" aria-hidden="true" />
    </div>
  );
}

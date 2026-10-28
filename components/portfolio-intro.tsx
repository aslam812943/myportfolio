"use client";

import { useEffect, useState } from "react";

const name = "MUHAMMAD ASLAM";

export function PortfolioIntro() {
  const [phase, setPhase] = useState<"show" | "leave" | "done">("show");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let loadReady = document.readyState === "complete";
    let minimumElapsed = false;
    let leaving = false;
    let exitTimer: number | undefined;

    const beginExit = () => {
      if (leaving || !minimumElapsed || !loadReady) return;
      leaving = true;
      setPhase("leave");
      exitTimer = window.setTimeout(() => {
        document.body.style.overflow = previousOverflow;
        setPhase("done");
      }, 650);
    };
    const onLoad = () => {
      loadReady = true;
      beginExit();
    };

    window.addEventListener("load", onLoad);
    const minimumTimer = window.setTimeout(() => {
      minimumElapsed = true;
      beginExit();
    }, 2900);
    // A slow third-party asset must never leave the visitor behind the intro.
    const fallbackTimer = window.setTimeout(() => {
      loadReady = true;
      minimumElapsed = true;
      beginExit();
    }, 4500);
    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(minimumTimer);
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(exitTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`portfolio-intro${phase === "leave" ? " is-leaving" : ""}`} role="status" aria-label="Loading portfolio">
      <span className="portfolio-intro-name" aria-hidden="true">
        {[...name].map((letter, index) => (
          letter === " "
            ? <span className="portfolio-intro-space" key={index} />
            : <span className="portfolio-intro-letter" key={index} style={{ animationDelay: `${index * 115}ms` }}>{letter}</span>
        ))}
        <span className="portfolio-intro-dot" aria-hidden="true">.</span>
      </span>
    </div>
  );
}

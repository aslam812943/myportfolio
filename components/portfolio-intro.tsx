"use client";

import { useEffect, useState } from "react";

const name = "MUHAMMAD ASLAM";

export function PortfolioIntro() {
  const [phase, setPhase] = useState<"show" | "leave" | "done">("show");

  useEffect(() => {
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(() => {
        root.style.overflow = previousOverflow;
        setPhase("done");
      }, 250);
      return () => {
        window.clearTimeout(timer);
        root.style.overflow = previousOverflow;
      };
    }

    const portrait = document.querySelector<HTMLImageElement>(".hero-portrait");
    let loadReady = !portrait || portrait.complete;
    let minimumElapsed = false;
    let leaving = false;
    let exitTimer: number | undefined;

    const beginExit = () => {
      if (leaving || !minimumElapsed || !loadReady) return;
      leaving = true;
      setPhase("leave");
      exitTimer = window.setTimeout(() => {
        root.style.overflow = previousOverflow;
        setPhase("done");
      }, 420);
    };
    const onPortraitReady = () => {
      loadReady = true;
      beginExit();
    };

    portrait?.addEventListener("load", onPortraitReady);
    portrait?.addEventListener("error", onPortraitReady);
    const minimumTimer = window.setTimeout(() => {
      minimumElapsed = true;
      beginExit();
    }, 1900);
    // A failed or slow image must not keep the portfolio hidden.
    const fallbackTimer = window.setTimeout(() => {
      loadReady = true;
      minimumElapsed = true;
      beginExit();
    }, 4000);
    return () => {
      portrait?.removeEventListener("load", onPortraitReady);
      portrait?.removeEventListener("error", onPortraitReady);
      window.clearTimeout(minimumTimer);
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(exitTimer);
      root.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`portfolio-intro${phase === "leave" ? " is-leaving" : ""}`}
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
            : <span className="portfolio-intro-letter" key={index} style={{ animationDelay: `${index * 70}ms` }}>{letter}</span>
        ))}
        <span className="portfolio-intro-dot" aria-hidden="true">.</span>
      </span>
      <span className="portfolio-intro-spinner" aria-hidden="true" />
    </div>
  );
}

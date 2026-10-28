"use client";

import { useEffect, useState } from "react";

const name = "MUHAMMAD ASLAM";

export function PortfolioIntro() {
  const [phase, setPhase] = useState<"show" | "leave" | "done">("show");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(() => {
        document.body.style.overflow = previousOverflow;
        setPhase("done");
      }, 900);
      return () => {
        window.clearTimeout(timer);
        document.body.style.overflow = previousOverflow;
      };
    }

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
            : <span className="portfolio-intro-letter" key={index} style={{ animationDelay: `${index * 115}ms` }}>{letter}</span>
        ))}
        <span className="portfolio-intro-dot" aria-hidden="true">.</span>
      </span>
    </div>
  );
}

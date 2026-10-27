"use client";

import { useEffect, useState } from "react";

const chapters = [
  { id: "beginning", name: "THE BEGINNING", shape: "POINT" },
  { id: "story", name: "THE CURIOSITY", shape: "LINE" },
  { id: "work", name: "THE PROOF", shape: "GRID" },
  { id: "expertise", name: "BEHIND THE BUILD", shape: "INTERFACE" },
  { id: "creative", name: "BEYOND CODE", shape: "PRODUCT" },
  { id: "contact", name: "WHAT'S NEXT?", shape: "CONNECTION" },
];

export function BuildJourney() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [overExpertise, setOverExpertise] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = window.innerHeight * 0.42;
        let current = 0;
        chapters.forEach((chapter, index) => {
          const section = document.getElementById(chapter.id);
          if (section && section.getBoundingClientRect().top <= marker) current = index;
        });
        setActive(current);
        const expertise = document.getElementById("expertise")?.getBoundingClientRect();
        setOverExpertise(Boolean(expertise && expertise.top < window.innerHeight && expertise.bottom > 0));
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (overExpertise || active === chapters.length - 1) return null;

  return (
    <aside className={`build-journey ${active === 1 ? "is-curiosity" : ""}`} aria-label="Build Log chapter progress">
      <div className="journey-stage" aria-hidden="true" data-stage={active}>
        <span className="stage-point" />
        <span className="stage-line" />
        <span className="stage-grid" />
        <span className="stage-interface" />
        <span className="stage-person" />
      </div>
      <div className="journey-copy"><span>{chapters[active].shape}</span><strong>{chapters[active].name}</strong></div>
      <div className="journey-track" aria-hidden="true"><span style={{ height: `${progress * 100}%` }} /></div>
      <span className="journey-count">{String(active).padStart(2, "0")} / {String(chapters.length - 1).padStart(2, "0")}</span>
    </aside>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  ["WORK", "#work"],
  ["STORY", "#story"],
  ["EXPERTISE", "#expertise"],
  ["CREATIVE", "#creative"],
  ["LET'S TALK", "#contact"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overAnatomy, setOverAnatomy] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const section = document.querySelector<HTMLElement>(".anatomy-entrance");
      const header = document.querySelector<HTMLElement>(".site-header");
      if (section && header) {
        const rect = section.getBoundingClientRect();
        const edge = header.getBoundingClientRect().height;
        setOverAnatomy(rect.top <= edge && rect.bottom > edge);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${overAnatomy && !open ? "is-cream" : ""} ${open ? "is-menu-open" : ""}`}>
      <a className="wordmark" href="#top" aria-label="Muhammad Aslam home"><span className="brand-full" aria-hidden="true">MUHAMMAD ASLAM.</span><span className="brand-short" aria-hidden="true">M ASLAM.</span></a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">
          {links.map(([label, href], index) => (
            <a key={href} href={href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}


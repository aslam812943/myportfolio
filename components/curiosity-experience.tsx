"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

const stages = [
  { number: "01", title: "EXPLORE", copy: "Understand. Research. Learn.", href: "#work" },
  { number: "02", title: "BUILD", copy: "Design. Develop. Iterate.", href: "#work" },
  { number: "03", title: "IMPROVE", copy: "Refine. Optimize. Grow.", href: "#expertise" },
  { number: "04", title: "IMPACT", copy: "Create. Ship. Make an impact.", href: "#contact" },
];

export function CuriosityExperience() {
  const section = useRef<HTMLElement>(null);
  const reduced = useHydratedReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const progress = useTransform(scrollYProgress, [0, 1], [0.08, 1]);
  const artworkY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [24, -8]);
  const artworkScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.98, 1]);
  const artworkOpacity = useTransform(scrollYProgress, [0, 0.06, 0.3], reduced ? [1, 1, 1] : [0, 0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(3, Math.floor(Math.max(0, value) * 4));
    setActive((current) => current === next ? current : next);
  });

  return (
    <section ref={section} className="story curiosity-section chapter" id="story" aria-labelledby="story-title">
      <div className="curiosity-sticky">
        <div className="curiosity-atmosphere" aria-hidden="true" />
        <motion.div
          className="curiosity-artwork"
          aria-hidden="true"
          initial={reduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: artworkY, scale: artworkScale, opacity: artworkOpacity }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/startwith/neon-portal-1536.webp" srcSet="/startwith/neon-portal-800.webp 800w, /startwith/neon-portal-1536.webp 1536w" sizes="(max-width: 767px) 100vw, (max-width: 1439px) 60vw, 74vw" alt="" width={1536} height={1024} loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        </motion.div>

        <div className="curiosity-layout">
          <div className="curiosity-copy">
            <p className="chapter-label"><span>01</span>THE CURIOSITY</p>
            <motion.h2 id="story-title" initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              IT STARTS<br />WITH<br /><em>CURIOSITY.</em>
            </motion.h2>
            <p className="curiosity-intro">I&apos;m always curious about how things work, why they work, and how to make them better.</p>
            <div className="curiosity-artwork-mobile" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/startwith/neon-portal-800.webp" srcSet="/startwith/neon-portal-800.webp 800w, /startwith/neon-portal-1536.webp 1536w" sizes="calc(100vw - 40px)" alt="" width={1536} height={1024} loading="lazy" decoding="async" />
            </div>
            <p className="curiosity-keywords">Learn.<br />Experiment.<br />Build.<br />Repeat.</p>
          </div>

          <div className="curiosity-timeline" aria-label="Curiosity process">
            <div className="curiosity-progress" aria-hidden="true"><motion.span style={{ scaleY: progress }} /></div>
            {stages.map((stage, index) => (
              <article className={`curiosity-stage ${index === active ? "is-active" : index < active ? "is-complete" : ""}`} key={stage.number}>
                <i aria-hidden="true" />
                <span>{stage.number}</span>
                <div><h3>{stage.title}</h3><p>{stage.copy}</p></div>
                <Link href={stage.href} aria-label={`${stage.title}: ${stage.copy}`}><ArrowUpRight aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

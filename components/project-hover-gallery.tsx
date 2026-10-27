"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { ProjectScreenshot } from "@/data/projects";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function ProjectHoverGallery({ screenshots, name, href, video }: { screenshots: ProjectScreenshot[]; name: string; href?: string; video?: string }) {
  const available = screenshots.filter((shot) => shot.src && shot.src.startsWith("/"));
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const startX = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const move = (direction: number) => setActive((current) => (current + direction + available.length) % available.length);

  if (available.length === 0) {
    const visual = (
      <div className="project-visual" aria-label={`${name} project cover; authentic screenshots have not been supplied`}>
        <div className="visual-grid" aria-hidden="true" />
        <span className="visual-index">PROJECT VISUAL / SCREENSHOTS PENDING</span>
        <div className="visual-center"><span>THE BUILD LOG</span><strong>{name}</strong><i aria-hidden="true">↗</i></div>
        <span className="visual-caption">{href ? "EXPLORE PROJECT ↗" : "PROJECT VISUAL / SCREENSHOTS PENDING"}</span>
      </div>
    );
    return href ? <Link className="project-visual-link" href={href} aria-label={`Explore ${name} case study; screenshots pending`}>{visual}</Link> : visual;
  }

  return (
    <div
      className={`project-gallery ${playing ? "video-playing" : ""}`}
      tabIndex={0}
      role="group"
      aria-label={`${name} screenshot gallery`}
      onPointerEnter={(event) => {
        if (!video || event.pointerType === "touch") return;
        setPlaying(true);
        const playback = videoRef.current?.play();
        playback?.catch(() => setPlaying(false));
      }}
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        const rect = event.currentTarget.getBoundingClientRect();
        const index = Math.min(available.length - 1, Math.floor(((event.clientX - rect.left) / rect.width) * available.length));
        setActive(Math.max(0, index));
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "touch") return;
        setActive(0);
        setPlaying(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") move(1);
        if (event.key === "ArrowLeft") move(-1);
      }}
      onTouchStart={(event) => { startX.current = event.touches[0].clientX; }}
      onTouchEnd={(event) => {
        if (startX.current === null) return;
        const delta = event.changedTouches[0].clientX - startX.current;
        if (Math.abs(delta) > 40) move(delta < 0 ? 1 : -1);
        startX.current = null;
      }}
    >
      <div className="gallery-images">
        {available.map((shot, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={shot.src} src={shot.src} alt={shot.alt} className={index === active ? "active" : ""} loading={index === 0 ? "eager" : "lazy"} />
        ))}
      </div>
      {video && <video ref={videoRef} className={`gallery-video ${playing ? "active" : ""}`} src={video} muted loop playsInline preload="metadata" aria-hidden="true" />}
      {available.length > 1 && <span className="gallery-hint">{video ? (playing ? "PLAYING PROJECT VIDEO · MOVE OUT TO RESET" : "HOVER TO PLAY VIDEO · USE ARROWS OR SWIPE") : "MOVE ACROSS TO EXPLORE · USE ARROWS OR SWIPE"}</span>}
      <div className="gallery-bar">
        <span>{playing ? "Project video" : available[active].label}</span>
        <span>{playing ? "VIDEO" : `${String(active + 1).padStart(2, "0")} / ${String(available.length).padStart(2, "0")}`}</span>
      </div>
      {available.length > 1 && <div className="gallery-controls">
        <button onClick={() => move(-1)} aria-label={`Previous ${name} screenshot`}><ArrowLeft /></button>
        <button onClick={() => move(1)} aria-label={`Next ${name} screenshot`}><ArrowRight /></button>
      </div>}
    </div>
  );
}


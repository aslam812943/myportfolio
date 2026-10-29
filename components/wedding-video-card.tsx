"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";

export function WeddingVideoCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (!("IntersectionObserver" in window)) {
      const timer = setTimeout(() => {
        setHasEntered(true);
        setIsVisible(true);
      }, 0);
      return () => clearTimeout(timer);
    }
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
      if (entry.isIntersecting) setHasEntered(true);
    }, { rootMargin: "200px" });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (hasEntered) videoRef.current?.load();
  }, [hasEntered]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasEntered) return;
    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [hasEntered, isVisible]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div className="creative-card wedding" ref={cardRef}>
      <video ref={videoRef} className="wedding-card-video" muted loop playsInline preload="none" poster={hasEntered ? "/projects/wedding-intro.png" : undefined} aria-hidden="true">
        {hasEntered && <source src="/wedding/VN20261013_170933.mp4" type="video/mp4" />}
      </video>
      <Link className="wedding-card-link" href="/work/dream-wedding" aria-label="View Dream Wedding project">
        <span>01 / DIGITAL EXPERIENCE</span>
        <h3>Dream Wedding</h3>
        <p>An invitation experience made for the web.</p>
        <ArrowUpRight aria-hidden="true" />
      </Link>
      <button className="wedding-sound-button" type="button" onClick={toggleSound} aria-label={muted ? "Play wedding video sound" : "Mute wedding video sound"} aria-pressed={!muted}>
        {muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
      </button>
    </div>
  );
}

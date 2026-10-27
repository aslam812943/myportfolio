"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";

export function WeddingVideoCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div className="creative-card wedding">
      <video ref={videoRef} className="wedding-card-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
        <source src="/wedding/VN20261013_170933.mp4" type="video/mp4" />
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

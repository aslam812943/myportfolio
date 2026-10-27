"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export function LiveProjectPreview({ project, isPhone, deferUntilVisible = false }: { project: Project; isPhone: boolean; deferUntilVisible?: boolean }) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [status, setStatus] = useState<"loading" | "loaded" | "unavailable">("loading");
  const [visible, setVisible] = useState(!deferUntilVisible);
  const viewportWidth = isPhone ? 390 : 1280;
  const scale = size.width / viewportWidth;

  useEffect(() => {
    const element = windowRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setSize({ width: entry.contentRect.width, height: entry.contentRect.height }));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!deferUntilVisible || visible) return;
    const element = windowRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { rootMargin: "300px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [deferUntilVisible, visible]);

  useEffect(() => {
    if (!visible || status !== "loading") return;
    const timer = window.setTimeout(() => setStatus((current) => current === "loading" ? "unavailable" : current), 8000);
    return () => window.clearTimeout(timer);
  }, [status, visible]);

  return <div className="editorial-image-window" ref={windowRef}>
    {visible && status !== "unavailable" && scale > 0 && <iframe
      className={`editorial-live-frame editorial-scaled-frame${status === "loaded" ? " is-loaded" : ""}`}
      src={project.liveUrl}
      title={`${project.name} live site preview`}
      loading="eager"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      referrerPolicy="strict-origin-when-cross-origin"
      style={{ width: viewportWidth, height: Math.ceil(size.height / scale), transform: `scale(${scale})` }}
      onLoad={() => setStatus("loaded")}
      onError={() => setStatus("unavailable")}
    />}
    {status === "loading" && <div className="editorial-live-placeholder" role="status"><span className="editorial-loading-spinner" aria-hidden="true" /><span>LOADING LIVE PREVIEW</span><strong>{project.name}</strong></div>}
    {status === "unavailable" && <div className="editorial-live-placeholder"><span>PREVIEW UNAVAILABLE INLINE</span><strong>{project.name}</strong><a href={project.liveUrl} target="_blank" rel="noopener noreferrer">OPEN FULL SITE <ArrowUpRight size={15} /></a></div>}
  </div>;
}

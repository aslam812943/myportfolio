"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MousePointerClick } from "lucide-react";
import type { Project } from "@/data/projects";

/*
 * Shows a light screenshot of the project immediately, then swaps in the real, interactive site
 * only when the visitor shows interest (hover, focus or tap). Loading a whole external website in an
 * iframe as soon as the section scrolls near was the heaviest part of the page, and it left an empty
 * frame or a "loading" spinner whenever the external site was slow or refused to be framed.
 */
export function LiveProjectPreview({ project, isPhone, deferUntilVisible = false }: { project: Project; isPhone: boolean; deferUntilVisible?: boolean }) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const startsLoaded = !project.previewImage && !deferUntilVisible;
  const [requested, setRequested] = useState(startsLoaded);
  const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "unavailable">(startsLoaded ? "loading" : "idle");
  const viewportWidth = isPhone ? 390 : 1280;
  const scale = size.width / viewportWidth;
  const poster = project.previewImage;

  useEffect(() => {
    const element = windowRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setSize({ width: entry.contentRect.width, height: entry.contentRect.height }));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const request = () => {
    setRequested(true);
    setStatus((current) => current === "idle" ? "loading" : current);
  };

  // Projects without a screenshot keep the previous behaviour: load the live site once it is near the viewport.
  useEffect(() => {
    if (poster || requested) return;
    const element = windowRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setRequested(true);
      setStatus((current) => current === "idle" ? "loading" : current);
    }, { rootMargin: "300px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [poster, requested]);

  useEffect(() => {
    if (status !== "loading") return;
    const timer = window.setTimeout(() => setStatus((current) => current === "loading" ? "unavailable" : current), 9000);
    return () => window.clearTimeout(timer);
  }, [status]);

  return <div
    className={`editorial-image-window${poster ? " has-poster" : ""}`}
    ref={windowRef}
    data-status={status}
    onPointerEnter={(event) => { if (event.pointerType === "mouse") request(); }}
    onFocusCapture={request}
  >
    {poster && <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="editorial-poster-fill" src={poster} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="editorial-poster" src={poster} alt={`${project.name} home page`} loading="lazy" decoding="async" />
    </>}
    {requested && status !== "unavailable" && scale > 0 && <iframe
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
    {poster && status === "idle" && <button type="button" className="editorial-poster-cta" onClick={request}>
      <MousePointerClick size={14} aria-hidden="true" />{isPhone ? "TAP TO TRY IT LIVE" : "TRY THE LIVE SITE"}
    </button>}
    {poster && status === "loading" && <span className="editorial-poster-cta is-loading" role="status"><span className="editorial-loading-spinner" aria-hidden="true" />LOADING LIVE SITE</span>}
    {poster && status === "unavailable" && <a className="editorial-poster-cta" href={project.liveUrl} target="_blank" rel="noopener noreferrer">OPEN FULL SITE <ArrowUpRight size={14} aria-hidden="true" /></a>}
    {!poster && status !== "loaded" && status !== "unavailable" && <div className="editorial-live-placeholder" role="status"><span className="editorial-loading-spinner" aria-hidden="true" /><span>LOADING LIVE PREVIEW</span><strong>{project.name}</strong></div>}
    {!poster && status === "unavailable" && <div className="editorial-live-placeholder"><span>PREVIEW UNAVAILABLE INLINE</span><strong>{project.name}</strong><a href={project.liveUrl} target="_blank" rel="noopener noreferrer">OPEN FULL SITE <ArrowUpRight size={15} /></a></div>}
  </div>;
}

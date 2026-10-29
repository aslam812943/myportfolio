"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/data/projects";
import { LiveProjectPreview } from "@/components/live-project-preview";

export function FeaturedProjectCarousel({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState(0);
  const active = selected;
  const project = projects[active];

  if (!project) return null;

  const choose = (index: number) => {
    setSelected((index + projects.length) % projects.length);
  };
  const isPhone = project.slug === "dream-wedding";

  return <div className={`editorial-gallery${isPhone ? " is-phone-project" : ""}`}>
    <div className="editorial-grid">
      <div className={`editorial-browser${isPhone ? " is-phone-preview" : ""}`}>
        <div className="editorial-browser-bar">
          <span className="editorial-browser-dots" aria-hidden="true"><i /><i /><i /></span>
          <span>LIVE SITE · INTERACTIVE</span>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} full site`}><ArrowUpRight size={15} /></a>
        </div>
        <LiveProjectPreview key={project.slug} project={project} isPhone={isPhone} deferUntilVisible />
        {!isPhone && <div className="editorial-preview-actions">
          <span>SCROLL &amp; EXPLORE</span>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">OPEN FULL SITE <ArrowUpRight size={13} /></a>
        </div>}
      </div>
      <div className="editorial-selector" role="group" aria-label="Select a project">
        {projects.map((item, index) => <button key={item.slug} type="button" className={`editorial-select${active === index ? " is-active" : ""}`} onClick={() => choose(index)} aria-pressed={active === index}>
          <span className="editorial-select-number">{String(index + 1).padStart(2, "0")}</span>
          <span className="editorial-select-name">{item.name}</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </button>)}
      </div>
    </div>
    <div className="editorial-bottom">
      <div className="editorial-detail" aria-live="polite">
        <p className="editorial-meta"><span>{String(active + 1).padStart(2, "0")}</span>{project.category} · {project.year}</p>
        <h3>{project.name}</h3>
        <p className="editorial-summary">{project.summary}</p>
        <div className="tag-row">{project.techStack.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
        <Link className="case-link" href={`/work/${project.slug}`}>VIEW PROJECT <ArrowUpRight size={15} /></Link>
      </div>
      <div className="editorial-controls">
        <div className="editorial-progress" aria-hidden="true"><span style={{ width: `${((active + 1) / projects.length) * 100}%` }} /></div>
        <div className="editorial-arrows"><button type="button" onClick={() => choose(active - 1)} aria-label="Previous project"><ArrowLeft /></button><button type="button" onClick={() => choose(active + 1)} aria-label="Next project"><ArrowRight /></button></div>
      </div>
    </div>
  </div>;
}

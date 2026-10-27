import { ArrowUpRight } from "lucide-react";
import { LiveProjectPreview } from "@/components/live-project-preview";
import type { Project } from "@/data/projects";

export function ProjectLiveFrame({ project, deferUntilVisible = false }: { project: Project; deferUntilVisible?: boolean }) {
  const isPhone = project.slug === "dream-wedding";

  return <div className={`editorial-browser case-live-preview${isPhone ? " is-phone-preview" : ""}`}>
    <div className="editorial-browser-bar">
      <span className="editorial-browser-dots" aria-hidden="true"><i /><i /><i /></span>
      <span>LIVE SITE · INTERACTIVE</span>
      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} full site`}><ArrowUpRight size={15} /></a>
    </div>
    <LiveProjectPreview project={project} isPhone={isPhone} deferUntilVisible={deferUntilVisible} />
    <div className="editorial-preview-actions">
      <span>SCROLL &amp; EXPLORE</span>
      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">OPEN FULL SITE <ArrowUpRight size={13} /></a>
    </div>
  </div>;
}

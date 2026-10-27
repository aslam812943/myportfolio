import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectLiveFrame } from "@/components/project-live-frame";
import { visibleProjects } from "@/data/projects";

export const metadata: Metadata = { title: "Selected Work — Muhammad Aslam", description: "Five software and creative web projects by Muhammad Aslam." };

export default function WorkIndex() {
  return <main className="index-page"><header className="simple-header"><Link href="/" aria-label="Muhammad Aslam home"><span className="brand-full" aria-hidden="true">MUHAMMAD ASLAM.</span><span className="brand-short" aria-hidden="true">M ASLAM.</span></Link><Link href="/#work"><ArrowLeft /> BACK TO THE BUILD LOG</Link></header><section className="index-hero"><p className="eyebrow">PROJECT INDEX / 05 PROJECTS</p><h1>IDEAS,<br /><em>SHIPPED.</em></h1><p>Real deployments, verified details where available, and visible notes where owner confirmation is still needed.</p></section><section className="project-index">{visibleProjects.map((project) => <article key={project.slug}><ProjectLiveFrame project={project} deferUntilVisible /><div><span>/{project.id} · {project.status.replaceAll("-", " ")}</span><h2>{project.name}</h2><p>{project.summary}</p><Link className="case-link" href={`/work/${project.slug}`}>READ CASE STUDY <ArrowUpRight /></Link></div></article>)}</section></main>;
}


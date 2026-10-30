import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectLiveFrame } from "@/components/project-live-frame";
import { visibleProjects } from "@/data/projects";

const workDescription = `Explore ${visibleProjects.length} software and creative web projects by Muhammad Aslam, including full-stack applications and interactive experiences.`;

export const metadata: Metadata = {
  title: "Projects & Case Studies",
  description: workDescription,
  alternates: { canonical: "/work" },
  openGraph: { title: "Projects & Case Studies | Muhammad Aslam", description: workDescription, url: "/work", siteName: "Muhammad Aslam", type: "website", locale: "en_US", images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Muhammad Aslam, full-stack developer" }] },
  twitter: { card: "summary_large_image", title: "Projects & Case Studies | Muhammad Aslam", description: workDescription, images: ["/og-image.jpg"] },
};

export default function WorkIndex() {
  return <main className="index-page"><header className="simple-header"><Link href="/" aria-label="Muhammad Aslam home"><span className="brand-full" aria-hidden="true">MUHAMMAD ASLAM.</span><span className="brand-short" aria-hidden="true">M ASLAM.</span></Link><Link href="/#work"><ArrowLeft /> BACK TO THE BUILD LOG</Link></header><section className="index-hero"><p className="eyebrow">PROJECT INDEX / {String(visibleProjects.length).padStart(2, "0")} PROJECTS</p><h1>IDEAS,<br /><em>SHIPPED.</em></h1><p>Real deployments, verified details where available, and visible notes where owner confirmation is still needed.</p></section><section className="project-index">{visibleProjects.map((project) => <article key={project.slug}><ProjectLiveFrame project={project} deferUntilVisible /><div><span>/{project.id} · {project.status.replaceAll("-", " ")}</span><h2>{project.name}</h2><p>{project.summary}</p><Link className="case-link" href={`/work/${project.slug}`}>READ CASE STUDY <ArrowUpRight /></Link></div></article>)}</section></main>;
}


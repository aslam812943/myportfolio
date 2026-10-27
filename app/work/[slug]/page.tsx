import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectLiveFrame } from "@/components/project-live-frame";
import { getProject, visibleProjects } from "@/data/projects";

export function generateStaticParams() { return visibleProjects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: `${project.name} — Muhammad Aslam`, description: project.summary, alternates: { canonical: `/work/${project.slug}` } } : {};
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const index = visibleProjects.findIndex((item) => item.slug === project.slug);
  const next = visibleProjects[(index + 1) % visibleProjects.length];
  return <main className="case-page"><header className="simple-header"><Link href="/" aria-label="Muhammad Aslam home"><span className="brand-full" aria-hidden="true">MUHAMMAD ASLAM.</span><span className="brand-short" aria-hidden="true">M ASLAM.</span></Link><Link href="/work"><ArrowLeft /> ALL WORK</Link></header>
    <section className="case-hero"><p className="eyebrow">CASE STUDY / {project.id}</p><h1>{project.name}</h1><div><p>{project.category}</p><p>{project.year}</p><p className={`status ${project.status}`}>{project.status.replaceAll("-", " ")}</p></div><p className="case-deck">{project.summary}</p></section>
    <section className="case-media" aria-label={`${project.name} live preview`}><ProjectLiveFrame project={project} /></section>
    <section className="case-glance"><p className="eyebrow">02 / AT A GLANCE</p><div><h2>A focused build,<br />documented honestly.</h2><dl><div><dt>Category</dt><dd>{project.category}</dd></div><div><dt>Project type</dt><dd>{project.projectType ?? (project.featured ? "Featured build" : "Selected work")}</dd></div><div><dt>Technology</dt><dd>{project.techStack.join(" · ")}</dd></div></dl></div></section>
    <section className="case-chapters"><article><span>03 / THE IDEA</span><h2>What it is.</h2><p>{project.overview}</p></article><article><span>04 / THE PROBLEM</span><h2>What it addresses.</h2><p>{project.challenge}</p></article><article><span>05 / THE BUILD</span><h2>How it comes together.</h2><p>{project.approach}</p></article></section>
    <section className="case-experience"><p className="eyebrow">06 / THE EXPERIENCE</p><h2>PRODUCT<br /><em>DETAILS.</em></h2><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>
    <section className="case-learning"><p className="eyebrow">07 / WHAT I LEARNED</p><p>{project.learning ?? (project.status === "verified" ? "Building an end-to-end product means treating interface decisions, data flow and operational details as one connected experience." : "Authentic development learnings are pending owner notes. No outcome or lesson has been invented for this project.")}</p></section>
    <section className="case-links"><p className="eyebrow">08 / EXPLORE</p><a href={project.liveUrl} target="_blank" rel="noreferrer">LIVE WEBSITE <ArrowUpRight /></a>{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">GITHUB <ArrowUpRight /></a>}</section>
    <Link className="next-story" href={`/work/${next.slug}`}><span>09 / NEXT STORY</span><strong>{next.name}</strong><ArrowUpRight /></Link>
  </main>;
}


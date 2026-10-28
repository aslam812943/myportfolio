import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { BuildAnatomy } from "@/components/build-anatomy";
import { AnatomyEntrance } from "@/components/anatomy-entrance";
import { BuildJourney } from "@/components/build-journey";
import { BehindTheBuild } from "@/components/behind-the-build";
import { ContactForm } from "@/components/contact-form";
import { ContactEntrance } from "@/components/contact-entrance";
import { CuriosityExperience } from "@/components/curiosity-experience";
import { FeaturedProjectCarousel } from "@/components/featured-project-carousel";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { ServicesShowcase } from "@/components/services-showcase";
import { WeddingVideoCard } from "@/components/wedding-video-card";
import { visibleProjects } from "@/data/projects";
import { socials } from "@/data/site";

const featured = visibleProjects.filter((project) => project.featured);
export const metadata: Metadata = { alternates: { canonical: "/" } };

function ChapterLabel({ number, children, light = false }: { number: string; children: React.ReactNode; light?: boolean }) {
  return <p className={`chapter-label ${light ? "on-light" : ""}`}><span>{number}</span>{children}</p>;
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section className="hero chapter" id="beginning" aria-labelledby="hero-title">
          <div className="idea-motif" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="hero-meta"><ChapterLabel number="00">THE BEGINNING</ChapterLabel><span>PORTFOLIO / 2026<br />MUHAMMAD ASLAM</span></div>
          <div className="hero-copy">
            <div className="headline-mask"><h1 id="hero-title">HI, I&apos;M <em>ASLAM.</em><br /><span className="hero-job-title">FULL STACK DEVELOPER.</span></h1></div>
          </div>
          <div className="hero-bottom">
            <p className="hero-role">Software Engineer.<br />Creative Thinker.<br />Always Building.</p>
            <div className="hero-intro"><p>I turn ideas into functional products, expressive websites, and meaningful digital experiences.</p><div className="button-row"><a className="pill" href="#work">EXPLORE MY WORK <ArrowDownRight /></a><a className="text-link" href="#contact">LET&apos;S CONNECT ↗</a></div></div>
            <div className="portrait-fallback hero-brand-card" aria-hidden="true"><span>@by__aslam</span><strong>A.</strong></div>
          </div>
          <Image className="hero-portrait" src="/images/aslam-hero.png" alt="Muhammad Aslam" width={1402} height={1122} priority />
          <a className="scroll-cue" href="#story">SCROLL TO EXPLORE <span>↓</span></a>
        </section>

        <CuriosityExperience />

        <section className="work chapter section-shell" id="work" aria-labelledby="work-title">
          <div className="section-intro"><p className="eyebrow">02 / THE PROOF</p><Reveal><h2 id="work-title">IDEAS,<br /><em>SHIPPED.</em></h2></Reveal><p>Selected projects that show what I enjoy building.</p></div>
          <FeaturedProjectCarousel projects={featured} />
          <Link className="all-work-link" href="/work">ALL {visibleProjects.length} PROJECTS <span>{String(visibleProjects.length).padStart(2, "0")}</span> ↗</Link>
        </section>

        <BehindTheBuild />

        <AnatomyEntrance>
          <div className="section-intro compact"><p className="eyebrow">BUILD ANATOMY / INTERACTIVE</p><Reveal><h2 id="anatomy-title">HOW AN IDEA<br />BECOMES A <em>PRODUCT.</em></h2></Reveal></div>
          <BuildAnatomy />
        </AnatomyEntrance>

        <section className="creative chapter section-shell" id="creative" aria-labelledby="creative-title">
          <ChapterLabel number="04">BEYOND CODE</ChapterLabel>
          <div className="creative-heading"><Reveal><h2 id="creative-title">BEYOND CODE.<br /><em>INTO CREATIVITY.</em></h2></Reveal><p>Creative work is another expression of the same curiosity — combining story, image, timing and interaction.</p></div>
          <div className="creative-grid">
            <WeddingVideoCard />
          </div>
          <ServicesShowcase />
        </section>

        <ContactEntrance>
          <ChapterLabel number="05">WHAT&apos;S NEXT?</ChapterLabel>
          <div className="contact-heading"><h2 id="contact-title">GOT AN IDEA?<br /><em>LET&apos;S BUILD IT.</em></h2><p>Whether it&apos;s a product, a website, or a creative video, tell me what you&apos;re working on. I reply within 24 hours.</p></div>
          <ContactForm />
        </ContactEntrance>
      </main>
      <footer><a className="footer-mark" href="#top">MUHAMMAD ASLAM.</a><p>MADE WITH CURIOSITY.</p><div>{socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>)}</div><p>© {new Date().getFullYear()} MUHAMMAD ASLAM</p><a href="#top">BACK TO TOP ↑</a></footer>
      <BuildJourney />
    </>
  );
}


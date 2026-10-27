import type { MetadataRoute } from "next";
import { visibleProjects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aslam-build-log.sharewealthai.chatgpt.site";
  return [{ url: base, lastModified: new Date() }, { url: `${base}/work`, lastModified: new Date() }, ...visibleProjects.map((project) => ({ url: `${base}/work/${project.slug}`, lastModified: new Date() }))];
}


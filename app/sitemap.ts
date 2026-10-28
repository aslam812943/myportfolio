import type { MetadataRoute } from "next";
import { visibleProjects } from "@/data/projects";
import { siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl }, { url: `${siteUrl}/work` }, ...visibleProjects.map((project) => ({ url: `${siteUrl}/work/${project.slug}` }))];
}


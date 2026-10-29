import type { Metadata } from "next";
import { PortfolioIntro } from "@/components/portfolio-intro";
import { siteUrl } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Muhammad Aslam",
  authors: [{ name: "Muhammad Aslam", url: siteUrl }],
  creator: "Muhammad Aslam",
  title: {
    default: "Muhammad Aslam | Full-Stack Developer",
    template: "%s | Muhammad Aslam",
  },
  description: "Muhammad Aslam is a full-stack developer building web applications, interactive websites, and creative digital experiences. Explore projects and case studies.",
  openGraph: {
    title: "Muhammad Aslam | Full-Stack Developer",
    description: "Explore full-stack applications, interactive websites, and creative projects by Muhammad Aslam.",
    type: "website",
    siteName: "Muhammad Aslam",
    url: siteUrl,
    locale: "en_US",
    images: [{ url: "/images/aslam-hero.png", width: 1402, height: 1122, alt: "Muhammad Aslam" }],
  },
  twitter: { card: "summary_large_image", title: "Muhammad Aslam | Full-Stack Developer", description: "Explore full-stack applications, interactive websites, and creative projects by Muhammad Aslam.", images: ["/images/aslam-hero.png"] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <PortfolioIntro />
        <a className="skip-link" href="#top">Skip to content</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: "Muhammad Aslam", url: siteUrl, sameAs: ["https://github.com/aslam812943", "https://www.linkedin.com/in/muhammad-aslam81/", "https://www.instagram.com/by__aslam/"], jobTitle: "Full-Stack Developer" }) }} />
      </body>
    </html>
  );
}

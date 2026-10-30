import type { Metadata } from "next";
import { PortfolioIntro } from "@/components/portfolio-intro";
import { INTRO_SEEN_KEY } from "@/components/intro-config";
import { ITEMS } from "@/components/behind-the-build-items";
import { siteUrl } from "@/data/site";
import "./globals.css";

const ogImage = { url: "/og-image.jpg", width: 1200, height: 630, alt: "Muhammad Aslam, full-stack developer" };

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
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title: "Muhammad Aslam | Full-Stack Developer", description: "Explore full-stack applications, interactive websites, and creative projects by Muhammad Aslam.", images: [ogImage.url] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

// Every skill listed in "Behind the build", so search engines can read them as structured data.
const knowsAbout = Array.from(new Set(ITEMS.flatMap((item) => item.tags)));

// Runs before the first paint: visitors who already saw the intro in this tab session skip it.
const introSkipScript = `try{if(sessionStorage.getItem(${JSON.stringify(INTRO_SEEN_KEY)})||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro-skip")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fonts used above the fold start downloading with the HTML instead of after the CSS. */}
        <link rel="preload" href="/fonts/space-grotesk-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: introSkipScript }} />
        <PortfolioIntro />
        <a className="skip-link" href="#top">Skip to content</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: "Muhammad Aslam", url: siteUrl, image: `${siteUrl}/og-image.jpg`, sameAs: ["https://github.com/aslam812943", "https://www.linkedin.com/in/muhammad-aslam81/", "https://www.instagram.com/by__aslam/"], jobTitle: "Full-Stack Developer", knowsAbout }) }} />
      </body>
    </html>
  );
}

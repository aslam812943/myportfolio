import type { Metadata } from "next";
import { PortfolioIntro } from "@/components/portfolio-intro";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aslam-build-log.sharewealthai.chatgpt.site"),
  title: {
    default: "Muhammad Aslam — Software Engineer & Creative Technologist",
    template: "%s | ASLAM.",
  },
  description: "Explore the work of Muhammad Aslam, a software engineer building full-stack applications, interactive websites, and creative digital experiences.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Muhammad Aslam — Software Engineer & Creative Technologist",
    description: "The Build Log: ideas becoming useful, expressive digital experiences.",
    type: "website",
    siteName: "ASLAM.",
  },
  twitter: { card: "summary_large_image", title: "ASLAM. — The Build Log", description: "Ideas becoming digital experiences." },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: "Muhammad Aslam", url: "https://aslam-build-log.sharewealthai.chatgpt.site", sameAs: ["https://github.com/aslam812943", "https://www.linkedin.com/in/muhammad-aslam81/", "https://www.instagram.com/by__aslam/"], jobTitle: "Software Engineer" }) }} />
      </body>
    </html>
  );
}

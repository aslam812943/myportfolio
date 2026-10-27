# Testing summary

Verification date: 21 October 2026.

## Passed

- ESLint: no findings.
- TypeScript: `tsc --noEmit` completed successfully.
- Production build: Vinext/Vite completed all five build environments.
- Runtime smoke tests: home, project index, all six project case studies, `robots.txt`, and `sitemap.xml` returned HTTP 200.
- Visual QA: captured 1440px desktop and a CDP-emulated 390px mobile viewport; checked home, work chapter, project index, and mobile menu. The chapter grid and stage rail are visible in desktop captures.
- Gallery interaction: clicking the next arrow changed the OpenLaw image to the local mobile capture and updated the accessible slide label.
- Image delivery: replaced the paid screenshot service with twelve local project captures (desktop and mobile for all six projects); checked the local server responds with HTTP 200 and no runtime `thum.io` references remain.
- Accessibility source checks: semantic sections/headings, skip link, visible focus, labeled controls, keyboard gallery navigation, Escape-close dialog, reduced-motion styles, and honest form feedback.

## Not claimed

- Core Web Vitals targets remain targets until the production URL has representative real-user measurements.
- Each project currently has two authentic screenshots; additional deeper product states require owner-provided access or assets.
- Authentic portrait and creative video behavior cannot be fully tested until owner media is supplied.


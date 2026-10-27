# Implementation and deployment notes

## Architecture

- Next.js App Router with TypeScript and Tailwind-compatible global CSS.
- Server-rendered pages by default; client components are limited to navigation, reveal motion, galleries, build anatomy, modal, and contact preparation.
- Central typed project data lives in `data/projects.ts`.
- Six static case-study routes are generated from that source.
- Contact prepares a populated email to `aslam812943@gmail.com`; no success state is shown because no submission backend was supplied.

## Performance

- Fixed media aspect ratios prevent layout shift.
- Below-fold screenshot variants are lazy loaded.
- No WebGL, background video, heavy blur field, or second animation library.
- The creative modal does not initialize a video player when authentic media is absent.

## Deployment

The Site uses the tracked `.openai/hosting.json` identity. To build locally, run `npm run build`. Publication is performed through the Sites source workflow and private deployment path. Future releases should preserve the existing `project_id`.


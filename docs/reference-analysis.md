# Reference analysis

Research date: 21 October 2026.

## Casberry

- Useful principles: direct positioning, a narrative sequence from identity to process to selected work, oversized editorial type, and a decisive contact close.
- Adapted: section pacing, compact metadata, asymmetric project presentation, and a clear final invitation.
- Not copied: branding, copy, project arrangements, imagery, and claims.
- Mobile: the same content order is retained with natural scrolling and reduced decorative layering.
- Performance: this build uses CSS/SVG-like geometry rather than WebGL or particle systems.

## OriginKit

- Useful principles: deliberate easing, compositor-friendly transforms, reduced-motion support, and source-level customization.
- Component decision: no OriginKit source was copied. Lightweight custom reveal and interaction primitives were more appropriate for this design.
- Licensing: the reviewed August 2026 terms allow project use and modification but restrict redistribution in templates/component libraries. Third-party dependencies keep their own licenses.
- Framework: the catalogue is broad and individual dependency requirements vary, so no compatibility was assumed.

## daisyUI Hover Gallery

- Verified behavior: the first image is visible by default; horizontal pointer regions reveal later images.
- Adapted component: `ProjectHoverGallery` maps pointer position to supplied local screenshots and adds a crossfade, active label, counter, arrow-key support, visible controls, and touch swiping. Projects without valid captures show a labeled project cover.
- Not copied: daisyUI styling, stock imagery, or its CSS component implementation.
- Framework: custom React avoids introducing a second UI framework for one behavior.
- Mobile/accessibility: explicit previous/next buttons and swipe supplement pointer behavior; the focused gallery accepts left/right arrow keys.
- Performance: images are layered within a fixed aspect ratio to prevent layout shift; non-first images are lazy loaded.

## Component mapping

| Principle | Portfolio implementation |
| --- | --- |
| Editorial narrative | Numbered chapter sections and case-study chapters |
| Purposeful reveal | `Reveal` using Motion for React and reduced-motion detection |
| Hover gallery | Custom accessible `ProjectHoverGallery` |
| Process storytelling | Curiosity steps and interactive build anatomy |
| Strong close | Honest mail-client contact workflow |

## Limitations

The OriginKit home page exposed limited crawlable detail. Several supplied deployments could not be reliably inspected through the research tool. Those limitations are recorded in the content audit and no features were inferred from page names alone.


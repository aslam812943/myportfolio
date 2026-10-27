# Design system

## Direction

Premium editorial design meets practical creative engineering: architectural grids, large typography, warm near-black surfaces, sage accents, and motion used to reveal hierarchy.

## Tokens

- Background `#101214`; surface `#181C1E`; elevated `#22282A`
- Text `#F4F2ED`; secondary `#A3AAA6`; muted `#737C78`
- Accent `#92B6A4`; accent light `#C2D3C8`
- Paper `#F0EEE8`; paper ink `#181C1E`
- Fast 150ms; standard 300ms; reveal 650ms; editorial 800ms
- Easing `cubic-bezier(0.22, 1, 0.36, 1)`

## Type

Space Grotesk for display, Inter for body, JetBrains Mono for metadata. CSS fallbacks preserve readability if remote fonts are unavailable.

## Layout and accessibility

The 1440px shell uses asymmetric two-column compositions above 900px and purpose-built single-column mobile compositions below it. All focusable controls receive a visible accent outline. Motion collapses under `prefers-reduced-motion`.


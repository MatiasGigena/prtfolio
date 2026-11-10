# Matías Gigena — Portfolio

A responsive portfolio built with Next.js, React, and strict TypeScript. The interface uses GSAP and Framer Motion for scroll, pointer, and spring-driven interactions, with reduced-motion fallbacks throughout.

## Requirements

- Node.js 24 (see `.nvmrc`)
- npm

## Development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Tests use Vitest and Testing Library in jsdom. They live in `tests/`, mirroring the layout of `app/` so the app directory holds only the app, and `tests/support/browser.ts` provides controllable stand-ins for `matchMedia` and `IntersectionObserver`, so tests can switch on reduced motion, a mouse, or a touch screen, and scroll elements into view.

TypeScript is configured in strict mode with unchecked indexed access enabled. Application code lives in `app/`; portfolio content (projects, the work statement, books, the About copy, contact details and social links, and technology logos) lives in `app/data/portfolio.ts`, typed by `app/types/portfolio.ts`. Section headings and short interface labels stay in their components.

## Motion and accessibility

GSAP (with ScrollTrigger) drives everything tied to scroll position or the pointer; Framer Motion handles entrance and presence transitions. Shared easing, media queries, and GSAP helpers live in `app/animations/`, and components read the reduced-motion preference with Framer Motion's `useReducedMotion()`.

- Pointer-driven interactions (magnetic buttons, the project preview, the skills cloud) are limited to fine-pointer devices.
- Smooth wheel scrolling (Lenis) runs only on wide screens with a fine pointer.
- `prefers-reduced-motion` disables the hero ticker, smooth scrolling, the tech gallery parallax, pointer-following effects, and the book marquee.
- `prefers-reduced-transparency` and `prefers-contrast` provide more legible navigation materials.

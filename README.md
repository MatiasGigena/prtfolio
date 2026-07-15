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
npm run build
```

TypeScript is configured in strict mode with unchecked indexed access enabled. Application code lives in `app/` and `hooks/`; portfolio content and typed models are centralized in `app/data/portfolio.ts` and `app/types/portfolio.ts`.

## Motion and accessibility

- Pointer-driven interactions are limited to fine-pointer devices.
- Gesture animations are interruptible and preserve release velocity.
- `prefers-reduced-motion` disables marquee, parallax, pinned horizontal movement, and carousel auto-rotation.
- `prefers-reduced-transparency` and `prefers-contrast` provide more legible navigation materials.

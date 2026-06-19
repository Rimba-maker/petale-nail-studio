# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server at http://localhost:4321
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

No linter or test runner is configured.

## Stack

- **Astro 5** — SSG, single page (`src/pages/index.astro`)
- **Tailwind CSS v4** — configured via `@tailwindcss/vite` Vite plugin; config lives entirely in `src/styles/global.css` using the `@theme {}` directive (no `tailwind.config.*` file)
- **React 19** — used only for interactive islands via `@astrojs/react`
- **Framer Motion 12** — animations inside React components
- **TypeScript** — strict mode, `jsx: react-jsx`, path alias `@/*` → `src/*`
- **Phosphor Icons** — `@phosphor-icons/react` (ESM-only; do not use `require()` to inspect it)

## Architecture

### Astro + React island pattern

Static sections are plain `.astro` files. Interactive sections are `.tsx` React components hydrated with a `client:*` directive in `index.astro`. The hydration budget is:

| Directive | Used for |
|---|---|
| `client:load` | Hero (above-fold, animates immediately) |
| `client:visible` | Services, DesignCatalog, TrendingDesigns, HygieneStandard, Addons |
| `client:idle` | BookCTA (lowest priority, booking form) |
| _(none)_ | Navbar, Process, Membership, Locations, Footer |

Phosphor icon components work in static `.astro` files without a `client:*` directive because Astro renders them to static HTML at build time.

### Design system

All design tokens are in `src/styles/global.css` under `@theme {}`. The system is "Hybrid A":
- **Claude** — warm cream canvas (`--color-canvas: #faf9f5`), Playfair Display + DM Sans typography, 96px section rhythm
- **Airbnb** — rose accent (`--color-rose: #c96b8a`), pill CTAs (`.btn-primary`)
- **Pinterest** — masonry grid, filter chips (`.chip` / `.chip.active`), tight 8px gutters

Key utility classes: `.container-petale`, `.section-rhythm`, `.display-xl/lg/md`, `.btn-primary`, `.btn-secondary`, `.chip`, `.badge`, `.section-label`.

Google Fonts (`Playfair Display`, `DM Sans`) are loaded via `<link>` tags in `index.astro` — **not** via `@import` inside `global.css` (Tailwind v4 processes CSS before `@import url()` runs, causing warnings).

### Images

All images are Unsplash CDN. Always use the format:
```
https://images.unsplash.com/photo-{id}?auto=format&fit=crop&q=80&w={width}&h={height}
```
Use different `crop` param values (`top`, `bottom`, `entropy`, `center`) on the same photo ID to create visual variety without broken links.

### Booking flow

`BookCTA.tsx` — 3-step multi-select form. On submit, opens a WhatsApp deep link (`wa.me/...`) with a pre-filled message and fires `canvas-confetti`. No backend.

### Deployment

Deployed to GitHub Pages at `https://rimba-maker.github.io/petale-nail-studio/` via `.github/workflows/deploy.yml`. The `base` path is set conditionally:

```js
base: process.env.GITHUB_ACTIONS ? '/petale-nail-studio' : '/'
```

`GITHUB_ACTIONS` is automatically `"true"` in CI and undefined locally, so the dev server always runs at `/`.

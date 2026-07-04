# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`genii-landing` — a premium single-page marketing landing for the "ГенИИ" video course (course on creating creative/artistic content with neural networks). React 19 + Vite 7 + Tailwind CSS v4 + Framer Motion SPA (JavaScript/JSX, **no TypeScript**). The `api/` folder holds **Vercel serverless functions** that connect the page's CTA buttons to payment + a chatbot CRM. Deployed on Vercel (zero-config, no `vercel.json`). UI copy is Russian.

## Commands

```bash
npm install          # first time
npm run dev          # Vite dev server + HMR — http://localhost:5173
npm run build        # production build → dist/
npm run preview      # serve the built dist/ locally
npm run lint         # eslint .
```

There is **no test framework and no test script** — verification is manual (run `npm run dev` and exercise the page). The React Compiler is enabled (`babel-plugin-react-compiler` in `vite.config.js`), so avoid patterns that fight it.

`npm run dev` (Vite) serves only the frontend; it does **not** run the `api/` serverless functions. To exercise `/api/*` locally use `vercel dev`, or test against a deployment. `dist/` is committed on disk even though it's in `.gitignore` — never hand-edit `dist/`; rebuild instead.

## Architecture

**Entry & routing.** `index.html` → `src/main.jsx` (wraps `App` in `BrowserRouter` + `StrictMode`) → `src/App.jsx`. Routes: `/` = `Landing`, plus legal pages `/privacy`, `/consent`, `/oferta` (`src/pages/`, content sourced from `docs/*.rtf`).

**The Landing page** (`src/App.jsx`) composes ~14 sections from `src/sections/` in a fixed order (`HeroVideoBlock`, `Authors`, `ExpertCarousel`, `StudentCarousel`, `Curriculum`, `MidCta`, `Format`+`Audience`, `Outcomes`, `Testimonials`, `Faq`, `FinalCta`, `Footer`) plus persistent overlay components from `src/components/` (`StickyNav` fixed header, `StickyCta` mobile bottom bar, `CursorGlow`, `ScrollProgress`, `SectionDivider`). Hero/background videos switch between desktop and mobile `.mp4` variants via a `matchMedia` listener in `App.jsx`.

**Content is data-driven — edit copy in `src/data/content.js`, not in JSX.** That single module exports all page text (`courseInfo`, `authors`, `curriculum`, `faqItems`, `testimonials`, etc.). Sections import from it. To change wording, prices, dates, or CTA labels, edit `content.js`.

**Styling.** Tailwind v4 configured in `tailwind.config.js` with a custom brand palette (`genii-bg` `#363538`, `genii-accent` `#7B1723`, `genii-light`, …), Inter font, and custom shadows/gradients. Use these tokens rather than raw hex where they exist.

**Media** lives in `public/media/` (served as-is at `/media/...`): hero/background videos (desktop + `-mobile` variants), expert/student/testimonial images and clips.

## CTA → payment → CRM funnel (the important cross-file behavior)

Every CTA button funnels through the serverless redirect `GET /api/go-pay` (`api/go-pay.js`), which 302-redirects to the Prodamus XL hosted checkout (`https://genii.lpxl.ru/`). **Do not link the payment host directly** — routing through `/api/go-pay` is what preserves BotHelp attribution.

CTA buttons **must forward the page's current query string** so BotHelp deep-link params (`tg_id`, `cuid`, `product`) survive the redirect. Two patterns exist; match them when adding a CTA:
- In-section buttons (`Hero`, `Authors`, `MidCta`, `FinalCta`) and `StickyCta`:
  `window.location.href = '/api/go-pay' + (window.location.search || '')`
- Header CTAs in `StickyNav`: `buildGoPayUrl()` reconstructs `tg_id`/`cuid`/`product` (default `product` = `'genii'`).

**BotHelp CRM tagging (server-side funnel tracking).** `api/_bothelp.js` (underscore prefix keeps Vercel from exposing it as a route) does OAuth2 `client_credentials` auth and `addTagByCuid(cuid, tag)` — subscribers are keyed by `cuid`. Tags are applied across the funnel:
- `click_button` → in `api/go-pay.js` when `cuid` is present (non-fatal; redirect proceeds even if tagging fails).
- `payment_opened` → Prodamus XL "order created" webhook `api/xl/order-created.js`.
- `payment_success` → Prodamus XL "payment success" webhook `api/xl/payment-success.js`.

**There is no client-side analytics** (no Google Analytics / Yandex Metrika / Pixel). The BotHelp tag funnel is the only tracking, and it is entirely server-side.

**Env vars** (set in the Vercel dashboard; not committed, no `.env` in repo): `BOTHELP_CLIENT_ID`, `BOTHELP_CLIENT_SECRET`, `BOTHELP_API_BASE`. Payment URL and the BotHelp OAuth URL are hardcoded constants in the `api/` files (no secrets hardcoded).

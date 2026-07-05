# bar for Autofleet

An ad-hoc, personalized application page: Bar Moshe applying to **Autofleet**
(autofleet.io, fleet + mobility optimization platform, Tel Aviv; an Element
Fleet Management company) as a **Full Stack Developer**.

Built in Autofleet's own visual language, read live off autofleet.io:
near-white `#F5F5F7` surface, ink `#333` headings (Visby CF, stood in for by
Poppins), `#11A4FF` CTAs with the inset-white sheen, the sky `#55C3FF` to mint
`#1EF5B9` signature gradient, and original isometric city scenes (pale blocks,
ribbon roads, gradient map pins, small vehicles) drawn fresh for this page.

Stack: Next.js + React + TypeScript, plain scoped CSS, GSAP ScrollTrigger for
the fade-up reveals (reduced-motion safe).

Live at **bar-for-autofleet.vercel.app** (noindex; a shareable link for the
Autofleet team). Not affiliated with Autofleet or Element Fleet Management.

## Run

```bash
npm install
npm run dev
```

## Map

- `app/page.tsx` — fonts (Poppins), metadata, mounts the app
- `app/opengraph-image.tsx` — brand-styled share card
- `src/marketing/autofleet/AutofleetApp.tsx` — the whole page
- `src/marketing/autofleet/autofleet.css` — Autofleet's extracted token system, scoped to `.af-root`
- `public/Bar_Moshe_Resume.pdf` — one-page CV

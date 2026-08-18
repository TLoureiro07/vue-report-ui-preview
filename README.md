# Vue UI Preview (portfolio demo)

> **Demonstration only — commercial product source is private.**

Standalone browser demo of a **Vue.js 2** in-game reporting interface. Adapted from the production NUI structure (`html/index.html` + `script.js`) with mock data and no FiveM integration.

## Stack

- **Vue 2.7** (Options API — same pattern as production)
- **JavaScript** (no TypeScript)
- **Vite** (local dev server and build)
- **CSS** adapted from production (`misc.css`, `style.css`) with generic fonts/assets
- **mockNui.js** replaces `fetchNui` / `GetParentResourceName`

## Run locally

```bash
cd preview
npm install
npm run dev
```

Open `http://localhost:5173` in Chrome. No FiveM server required.

```bash
npm run build    # → dist/
npm run preview  # serve production build
```

## What this demo shows

- **Category selector** — Player / Bug / Question cards with original layout classes
- **Report form** — `v-model` inputs, shake validation, mock screenshot upload with delay
- **Admin dashboard** — searchable/sortable list via computed property `_reports`
- **Top staff** + **report detail** — admin action toolbar with mock endpoints

Use **Player view / Admin view** or the **Jump to** bar to navigate quickly during a review.

## What this demonstrates

For hiring managers:

- Vue 2 Options API (`data`, `computed`, `methods`, `mounted`)
- Template-driven UI faithful to a shipped commercial product
- Client-side filtering and sorting without a backend
- NUI integration pattern mocked safely for public demo
- CSS architecture with viewport-relative units (`--piv`)

Production ships as a **private FiveM resource** (Vue NUI + Lua). This folder contains **only** the browser-safe subset.

## Screenshots & GIFs

1. Run `npm run dev` and navigate with the quick bar.
2. Capture with **Win + Shift + S** or **Cmd + Shift + 4**.
3. For GIFs: [ScreenToGif](https://www.screentogif.com/) or Chrome DevTools Recorder.

Suggested flow: selector → form validation → admin list → detail → top staff.

## Omitted for privacy

| Omitted | Reason |
|---------|--------|
| `client.lua`, `server.lua`, `fxmanifest.lua` | Game/server integration |
| `config/*.lua`, webhooks, permissions | Sensitive configuration |
| Full production `script.js` copy | Commercial logic + NUI wiring |
| Gilroy font, `bg.png`, product PNG/SVG assets | Proprietary assets |
| Real `GetParentResourceName`, live APIs, Tebex | Clone / client exposure |
| Chat system, real player data | Privacy |

## Standalone repo (Opção B)

This folder is intended to be published as its **own GitHub repository**, independent of the commercial parent project. A local git repo can live only inside `preview/`.

---

Not licensed for redistribution as a commercial product.

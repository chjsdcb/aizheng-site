# Aizheng.tech

Bilingual (EN / ZH) static marketing site for AI consulting & acceptance-based delivery.

## Stack

- [Astro](https://astro.build) — static output to `dist/`
- Hand-written CSS, dark professional theme, no UI framework
- i18n via `src/i18n/en.json` / `src/i18n/zh.json`
- No client-side trackers; Astro telemetry is disabled at build time

## Commands

| Command           | Action                                        |
| ----------------- | --------------------------------------------- |
| `npm ci`          | Install dependencies from the lockfile        |
| `npm run dev`     | Start local dev server at `localhost:4321`    |
| `npm run build`   | Build the static site into `dist/`            |
| `npm run preview` | Preview the built site locally                |

## Structure

```text
src/
  i18n/          en.json, zh.json — all copy lives here
  layouts/       BaseLayout.astro (head, header, footer)
  components/    one component per page section
  pages/         index.astro (EN, default), zh/index.astro (ZH mirror)
  styles/        global.css — hand-written dark theme
.github/workflows/deploy.yml — rsync deploy on push to main
```

## i18n

English is the default at `/`, Chinese mirrors it at `/zh/`. Each page imports its
locale's JSON dictionary and renders the same components with it. The header
switches between the two; `hreflang` alternates are emitted in the head.

## Forms

Both the order form and the one-pager email gate post to Formspree. Replace the
placeholder ID in both places with the same form ID:

- `src/components/OrderForm.astro` — `action="https://formspree.io/f/YOUR_FORM_ID"`
- `src/components/OnePager.astro` — same endpoint, submitted via `fetch`

The one-pager gate sends a hidden `tag` field with value `one-pager`.

## Placeholders

Replace these before launch:

- Formspree form ID in `OrderForm.astro` and `OnePager.astro`
- LinkedIn profile URL in `src/i18n/en.json` and `src/i18n/zh.json`
  (key `contact.linkedin`, currently `https://www.linkedin.com/in/YOUR_PROFILE`)

## Deploy

`.github/workflows/deploy.yml` runs on every push to `main`:

1. `checkout`
2. `setup-node` (Node 20) with npm cache
3. `npm ci` then `npm run build` (with `ASTRO_TELEMETRY_DISABLED=1`)
4. `burnett01/rsync-deployments@7.0.1` syncs `dist/` to `/var/www/aizheng.tech`

Required repository secrets:

- `REMOTE_HOST`
- `REMOTE_USER`
- `DEPLOY_KEY`

## Domain

`https://aizheng.tech` (configured as the Astro `site`, used for canonical URLs).

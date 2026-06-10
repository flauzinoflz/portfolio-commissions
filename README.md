# FLZ — Gabriel Flauzino's Portfolio

🇧🇷 [Leia em português →](README.pt-BR.md)

Professional portfolio for digital illustration and concept art, built with
**plain HTML, CSS and JavaScript** — no frameworks, no build step, no runtime
dependencies. The site is itself a portfolio piece: of the artwork and of the
engineering behind it.

**Visual identity:** cartographic UI inspired by Destiny 2's map screens —
warm paper background, hairline rules, decorative coordinates, a slowly
rotating reticle, and a lightbox that behaves like an expanded "map node".
Dark red (`#7a1f1a`) is reserved for banners and emphasis; `#1b1313` is the
ink.

---

## Stack and architecture decisions

| Layer | Choice | Why |
|---|---|---|
| Markup | Semantic HTML5, multi-page | Real per-page SEO, zero routing cost, accessible by default |
| Styling | Plain CSS with custom properties | `tokens.css` is the single source of identity — the v1→v2 dark-to-light rebrand touched mostly this one file |
| Behavior | Vanilla JS (4 modules) | `i18n.js` (languages) · `main.js` (global) · `gallery.js` (render) · `lightbox.js` (map node) |
| Content | `data/portfolio.json` | Adding a work = edit JSON + push. No HTML is touched |
| Languages | EN/PT toggle, no library | ~40-key dictionary, `data-i18n` attributes, `localStorage` persistence. English is the default (US client base) |
| Type | Syncopate · Hanken Grotesk · IBM Plex Mono | Syncopate stands in for Sackers Gothic (the FLZ mark), with a ready slot for the licensed font |

**Why no frameworks?** For a four-page content site, a framework adds weight,
a build pipeline and maintenance with no proportional return. This
architecture ships ~0 KB of third-party JavaScript and still delivers a
dynamic gallery, two languages, deep linking and a fully accessible modal
panel.

## Engineering highlights

- **Tokenized design system** — colors, type, spacing and motion curves
  centralized in [`css/tokens.css`](css/tokens.css), using semantic names
  (`--bg`, `--ink`, `--accent`) so theme inversions are token-only changes
- **Decoupled content** — gallery rendered from
  [`data/portfolio.json`](data/portfolio.json) via `fetch`, filtered by a
  category declared in the HTML (`<main data-category="...">`)
- **Dependency-free i18n** — every UI string keyed in
  [`js/i18n.js`](js/i18n.js); JSON descriptions are bilingual objects
  (`{ "en": …, "pt": … }`) resolved at render time, with live re-render on
  language switch (including inside an open lightbox)
- **Real accessibility, not a checkbox**: skip link, landmarks, focus trap in
  the lightbox, `Esc`/arrow keys, focus returned to the originating card,
  `prefers-reduced-motion` honored everywhere, `<html lang>` synced to the
  active language
- **Performance**: `loading="lazy"`, `aspect-ratio` reserving space (zero
  layout shift), ambient visuals drawn with inline SVG and CSS only
- **Deep linking**: opening a work writes `#obra=<id>` to the URL —
  shareable links that open straight into the panel
- **Baseline security**: JSON data enters the DOM through
  `textContent`/attributes, never interpolated as HTML

## Folder structure

```
flz-portfolio/
├── index.html              # Home — hero + featured works
├── ilustracoes.html        # Filtered gallery: illustration
├── concept-art.html        # Filtered gallery: concept-art
├── commissions.html        # Terms, styles and contact
├── data/
│   └── portfolio.json      # Single content source (bilingual fields)
├── css/
│   ├── tokens.css          # Design tokens (color, type, motion)
│   ├── base.css            # Reset, typography, a11y primitives
│   ├── components.css      # Nav, cards, banner, lightbox, footer
│   └── pages.css           # Hero and page-specific layouts
├── js/
│   ├── i18n.js             # EN/PT dictionary + language toggle
│   ├── main.js             # Reveal-on-scroll, global details
│   ├── gallery.js          # Fetch + filter + grid render
│   └── lightbox.js         # Accessible "map node" panel
└── assets/
    └── img/works/          # One folder per work (see inner README)
```

## Running locally

The gallery uses `fetch()` to read the JSON, so the site must be served over
HTTP (opening the file directly is blocked by CORS):

```bash
git clone https://github.com/YOUR-USER/flz-portfolio.git
cd flz-portfolio

# Option 1 — Python
python -m http.server 8000

# Option 2 — Node
npx serve .
```

Open `http://localhost:8000`. No install, no build.

## Updating content

1. Drop the images in `assets/img/works/<work-slug>/`
   (convention documented in [`assets/img/works/README.md`](assets/img/works/README.md))
2. Add the entry to `data/portfolio.json` (descriptions in both languages)
3. Commit and push — the site reflects it automatically

## AI-assisted development

This project was built in partnership with an LLM (Claude), used
deliberately — not as a code generator accepted blindly, but as a tool
inside a process with human quality control:

1. **Architecture before code** — file structure, JSON schema and stack
   decisions were proposed, discussed and approved before any implementation
2. **A rigorous design brief** — palette, visual references (Destiny 2 UI,
   editorial layout) and anti-goals ("zero generic AI look") written down,
   constraining the solution space
3. **Critical review** — every generated file is read, tested and adjusted;
   the LLM accelerates typing, it does not replace technical judgment
4. **Constraints as quality** — demanding vanilla JS, design tokens and
   explicit accessibility forces the LLM to produce defensible code, not
   the shortest path

What I want this to demonstrate: knowing how to **specify, direct and
audit** AI work is now part of the craft of development.

## Roadmap

- [x] **v1 — Static frontend** (dark theme)
- [x] **v2 — Rebrand + i18n**: Destiny-paper light theme, EN/PT language
  system, editorial minimalism
- [ ] **v3 — Commissions API**: **FastAPI + PostgreSQL** backend with a
  request form, public queue status and an admin panel. The frontend is
  ready: the Commissions page starts consuming the API while keeping the
  same design system
- [ ] **v4 — Custom domain + deploy**: personalized domain, CDN for images,
  light analytics and simple CI (JSON validation + lint on push)
- [ ] **v5 — Content**: licensed Sackers Gothic replacing Syncopate, final
  artwork replacing placeholder images

## License

Code under MIT. **The artworks belong to Gabriel Flauzino — all rights
reserved.** Do not reuse the images without permission.

# Lmars Studio — Project Guide

> **For agents (Claude Code, Cursor, anything else):** Read this file and `DESIGN.md` before making any changes. After changes, **update both files** if the project structure, conventions, or design rules shift. Stale docs are worse than no docs.

---

## What this is

**Lmars Studio** (lmarsstudio.com) is the personal photography & video site for **Lmar Oria**, a photographer based in **San Antonio, TX**. The site is the creative/portfolio side — *not* a software engineering portfolio. Career, software, or resume content does **not** belong here.

The site exists to:

1. Showcase photography (cars, streets, landscapes — mostly automotive)
2. Surface short-form video work as Lmar builds it out
3. Convert visitors into shoot bookings (rates page + contact form)
4. Link out to Instagram (`@lmar.oria`) as the primary social channel
5. Host project-specific pages (e.g. travel series, themed shoots) with custom theming

## Voice & tone

- First-person, casual, confident. Not corporate.
- "I shoot…" not "We shoot…"
- Short. Concrete. Avoid marketing fluff ("passion", "experience", "passionate about", etc.).
- Defaults Lmar dislikes:
  - **Do not** say "San Francisco." He lives in **San Antonio**.
  - **Do not** name a camera body (e.g. "Sony A7iii"). Gear is not a talking point.
  - **Do not** use the word "motion" for video. Use **video**.

---

## Tech stack

Plain static site. No build step. No framework.

- **HTML / CSS / vanilla JS** — every page is hand-written HTML
- **One React-via-Babel-standalone page** (`index.html`) for the dynamic homepage (rates sidebar, IG feed, etc.). JSX is inlined, compiled in-browser.
- **Shared CSS** in `styles.css` — every page links it
- **Shared JS helper** in `projects.js` — populates the Projects nav dropdown, wires the mobile menu, drives reveal-on-scroll animations. Loaded by every page.
- **Hosting:** Netlify (auto-deploys from `main`)
- **Forms:** Netlify Forms (zero config, just `data-netlify="true"` on the `<form>`)
- **Instagram feed:** behold.so (free tier; feed ID hardcoded in `index.html`)
- **Fonts:** Google Fonts — Inter (UI), Fraunces (display serif), JetBrains Mono (mono accents)

## File structure

```
/
├── index.html              # React-driven homepage
├── about.html              # About page with bio, specialties, and FAQ accordion
├── gallery.html            # Full photo gallery (sidebar-filtered by category)
├── contact.html            # Static contact page with Netlify Form + FAQ accordion
├── thanks.html             # Post-submit redirect (noindex)
├── styles.css              # All shared styles (single source)
├── projects.js             # Shared JS: nav dropdown, mobile menu, reveal observer
├── photos.js               # Master photo list + categories (drives gallery.html)
├── photos/                 # Site-wide photo assets (jpg)
├── projects/               # Per-project pages, one HTML file each
│   └── tokyo-streets.html  # Reference template (custom palette override)
├── CLAUDE.md               # This file
├── DESIGN.md               # Design system rules
└── .gitignore
```

---

## How to add a new project

Each project gets a standalone HTML page with its own palette. Pattern:

1. **Duplicate** `projects/tokyo-streets.html` → `projects/<slug>.html`. Use a short kebab-case slug (e.g. `gt3-mr`, `pacifica-sunsets`).
2. **Edit the `:root` override block at the top of the file** to set the project's color palette. See `DESIGN.md` for which variables to set.
3. **Update the page content:**
   - `<title>` and `<meta name="description">`
   - Hero eyebrow, h1, blurb, meta strip (location / when / frames)
   - Hero image (path to a photo in `/photos/`)
   - Gallery cells (use `.cell`, `.cell.wide`, `.cell.tall`, `.cell.large` for layout variety)
4. **Register the project in `projects.js`** by appending to the `window.PROJECTS` array:
   ```js
   { id: "<slug>", title: "<Short Name>", date: "<Year>", blurb: "<one line>", url: "/projects/<slug>.html" }
   ```
   - **`title` must be ~2–3 words / ≤20 characters** so the dropdown stays clean. The full project name lives in the page's `<h1>`, not the nav.
5. Confirm the project shows up in the Projects dropdown across all pages (it should — the dropdown reads from `projects.js`).

## How to add new photos

1. Drop the optimized JPG into `/photos/`. Use the original filename if it carries semantic info (e.g. `DSC05137.jpg`), otherwise rename to something descriptive: `gt3-sunset-2025.jpg`.
2. **Optimize before committing:**
   - Long edge ≤ 2400px
   - JPG quality ~80
   - Keep file size under ~500KB where possible
3. **Add an entry to `photos.js`** so it shows up in the gallery:
   ```js
   { id: "<slug>", src: "/photos/<name>.jpg", alt: "<descriptive alt>", category: "Automotive" | "Street" | "Landscape", title: "<short title>", date: "<year>" }
   ```
   - `category` must match one of the entries in `window.PHOTO_CATEGORIES` exactly (case-sensitive). If you need a new category, add it to that array first.
   - Order in the array = order in the gallery. Newest at the top is a reasonable default.
4. Always include `alt` text. Decorative photos can use `alt=""`.
5. **Home page Photography section** is a curated preview only — still hand-edited in `index.html` (find the `<section id="photography">` block). Pick the 5 strongest from `photos.js` to feature there.
6. **Project galleries** are independent — edit the project's HTML file directly.

The gallery page (`gallery.html`) reads entirely from `photos.js` — no other edits needed for new photos to appear there.

## Conventions

- **One CSS file.** All shared styles in `styles.css`. Project-page palette overrides go in a small `<style>` block inside that page only.
- **No new JS files unless necessary.** Extend `projects.js` for shared behavior. Page-specific JS can be inlined.
- **Spacing scale lives in `DESIGN.md`** — don't introduce ad-hoc spacing values.
- **Use existing CSS variables** (`--bg`, `--ink`, `--accent`, etc.) rather than hex codes. Hex only inside the `:root` override at the top of a project page.
- **Reveal animations:** add `class="reveal"` (with optional `reveal-d1` … `reveal-d5` stagger) to any element. The shared observer wires it automatically.
- **Mobile nav:** every page needs the `.menu-toggle` button + `.mobile-menu` drawer in its header markup. Copy from an existing page if adding a new top-level page.

---

## Editing across Claude Code & Cursor

Both tools read this `CLAUDE.md`. The `.cursorrules` file at the repo root points back here so they share the same source of truth.

If you find yourself doing something this file doesn't cover:

1. Do the thing.
2. **Update `CLAUDE.md` or `DESIGN.md`** so the next agent (or future-you) doesn't have to rediscover it.
3. Commit the doc change alongside the code change.

If conventions in this file are unclear or contradict reality, **fix the file** rather than working around it.

## Sync rule (read this twice)

After **every** non-trivial change, ask:

- Did this change how someone should add a project? → update `CLAUDE.md`
- Did this introduce a new color, type style, spacing rule, or component pattern? → update `DESIGN.md`
- Did this change the file structure? → update `CLAUDE.md`
- Did this change a workflow (deploy, form handling, asset pipeline)? → update `CLAUDE.md`

Treat these docs as part of the codebase. Out-of-date docs are bugs.

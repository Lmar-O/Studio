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

## Supabase (gallery backend)

The gallery is backed by a Supabase project. Credentials are embedded in `gallery.html` and `admin.html` (anon public key — read-only for gallery visitors, write allowed for admin uploads).

- **Project:** `lmars-studio` (id: `yqjosmrnasjmlibxpnzj`, region: us-east-1)
- **URL:** `https://yqjosmrnasjmlibxpnzj.supabase.co`
- **`photos` table schema:**
  - `id` uuid pk
  - `src` text — public URL of the image
  - `alt` text — descriptive alt text
  - `category` text — one of Automotive, Portrait, Street, Landscape, Events
  - `title` text
  - `date` text — year string e.g. `"2026"`
  - `sort_order` integer — lower = shown first; defaults to 0
  - `created_at` timestamptz
- **Storage bucket:** `gallery` (public, 10MB max, images only)
- **RLS:** public read, anon insert + delete (admin page relies on anon key; password gate is client-side JS only)

### Admin page

`/admin.html` is a password-protected single-page admin UI. It is:

- **Not indexed** (`noindex, nofollow` meta + `Disallow: /admin.html` in `robots.txt`)
- **Password protected** client-side (`ADMIN_PASSWORD` constant in the inline script — change it there)
- **Default password:** `lmars2026` — change this before going live or if shared

The admin page lets you upload photos to Storage, insert rows into `photos`, and delete both.

## File structure

```
/
├── index.html              # React-driven homepage
├── about.html              # About page with bio, specialties, and FAQ accordion
├── gallery.html            # Full photo gallery (sidebar-filtered by category; fetches from Supabase)
├── contact.html            # Static contact page with Netlify Form + FAQ accordion
├── services.html           # Services & rates page (vanilla JS, category image switcher + FAQ)
├── thanks.html             # Post-submit redirect (noindex)
├── admin.html              # Password-protected admin panel for gallery management (noindex)
├── styles.css              # All shared styles (single source)
├── projects.js             # Shared JS: nav dropdown, mobile menu, reveal observer
├── photos.js               # Legacy photo list (kept for reference; gallery now reads from Supabase)
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

**The gallery is now backed by Supabase.** Photos are stored in the `photos` table and served via the Supabase REST API — no code deploy needed to add or remove photos.

### Using the admin panel (preferred)

1. Go to `/admin.html` and enter the admin password.
2. Drag and drop an image (or click to select). Fill in alt text, category, title, year, and sort order.
3. Click Upload. The photo appears in the gallery immediately.
4. The Manage section shows all current photos with a Delete button per photo.

### Manual upload (code path)

1. Upload the optimized JPG to Supabase Storage bucket `gallery` (or host it elsewhere and use that URL).
2. Insert a row into the `photos` table:
   ```sql
   insert into public.photos (src, alt, category, title, date, sort_order)
   values ('<public-url>', '<alt text>', 'Automotive', '<title>', '2026', 10);
   ```
   - `category` must be one of: `Automotive`, `Portrait`, `Street`, `Landscape`, `Events`
   - Lower `sort_order` = appears first in the gallery. Leave at `0` to float to the top.
3. The gallery page reads from Supabase at load time — no redeploy needed.

### Image optimization before uploading

- Long edge ≤ 2400px
- JPG quality ~80
- File size under ~500KB where possible

### Home page and project galleries

- **Home page Photography section** is still hand-edited in `index.html` (find `<section id="photography">`). Pick the 5 strongest to feature there.
- **Project galleries** are independent — edit the project's HTML file directly.

### Legacy `photos.js`

`photos.js` is kept for reference only. The 6 photos it defined were pre-seeded into Supabase at migration time (sort_orders 10–60). Do not rely on `photos.js` for gallery content going forward.

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

# Lmars Studio — Design System

> Read this **with** `CLAUDE.md`. When this file's rules change, update it. When the visual language drifts, fix the drift — don't add a new pattern.

The site has one job visually: let photography lead. Everything here serves that.

---

## Mood / direction

- **Warm, calm, deliberate.** Not loud. Not trendy. Reads as personal craft, not corporate studio.
- **Editorial-leaning** type — large serif display + clean sans body.
- **Warm off-white backgrounds** — like photo paper or a matte print — with near-black ink and a deep rust accent so photos and type both breathe.
- **Generous whitespace.** Nothing should feel cramped.

If a change makes the site feel busier, more saturated, or more "designed," it's probably going the wrong way.

---

## Color tokens

Defined as CSS custom properties in `styles.css` under `:root`. **Use the tokens. Don't hardcode hex.**

| Token              | Default value                       | Role                                                          |
|--------------------|-------------------------------------|---------------------------------------------------------------|
| `--bg`             | `#F2EDE7` (warm off-white)          | Page background                                               |
| `--bg-deep`        | `#E8E2DA` (slightly deeper warm)    | Inset surfaces (contact card, etc.)                           |
| `--bg-card`        | `#FAF8F5` (near-white lift)         | Cards, tiles, form field surfaces                             |
| `--ink`            | `#1A1512` (warm near-black)         | Primary text                                                  |
| `--ink-soft`       | `rgba(26, 21, 18, 0.72)`            | Secondary text                                                |
| `--ink-mute`       | `rgba(26, 21, 18, 0.48)`            | Meta text, labels, dimmed copy                                |
| `--line`           | `rgba(26, 21, 18, 0.11)`            | Borders, separators                                           |
| `--accent`         | `#A55222` (deep rust/terracotta)    | CTAs, hover states, highlights, italic display                |
| `--accent-2`       | `#5E8C7C` (muted sage)              | Secondary glow on ambient blobs                               |
| `--ink-on-accent`  | `#FAF8F5`                           | Text color on accent-filled buttons/chips — always set this when overriding `--accent` |

### Project-page palette overrides

Every project page can re-theme the entire site by overriding `:root` in a small `<style>` block at the top of the file. Override all 10 variables — partial overrides cause weirdness. Always set `--ink-on-accent` to a contrasting value for whichever accent you choose.

Example (Tokyo Streets — teal navy + neon red):

```css
:root {
  --bg:             #14202C;
  --bg-deep:        #0B141C;
  --bg-card:        #1F2E3D;
  --ink:            #E8F0F5;
  --ink-soft:       rgba(232, 240, 245, 0.85);
  --ink-mute:       rgba(232, 240, 245, 0.62);
  --line:           rgba(232, 240, 245, 0.12);
  --accent:         #E85D5D;
  --accent-2:       #7FB8D4;
  --ink-on-accent:  #0B141C;
}
body { background: var(--bg); }
```

Palette starting points to copy/paste:

- **Darkroom** (reserved for video page) — bg `#141210`, bg-deep `#0C0A09`, bg-card `#1E1A16`, ink `#F3EAE0`, ink-soft `rgba(243,234,224,0.85)`, ink-mute `rgba(243,234,224,0.58)`, line `rgba(243,234,224,0.10)`, accent `#D4904E`, accent-2 `#7E9E8E`, ink-on-accent `#141210`
- **Desert** — bg `#2A1F18`, ink `#F0E5D4`, accent `#E8A04C`, accent-2 `#C77B5C`, ink-on-accent `#2A1F18`
- **Forest** — bg `#1A2620`, ink `#E8EDE3`, accent `#9FBF73`, accent-2 `#D4A57A`, ink-on-accent `#1A2620`
- **Monochrome** — bg `#1A1A1A`, ink `#F0F0F0`, accent `#F0F0F0`, accent-2 `#888`, ink-on-accent `#1A1A1A`
- **Coastal** — bg `#0E2A33`, ink `#E8F2F0`, accent `#E8B95C`, accent-2 `#6FAAB0`, ink-on-accent `#0E2A33`

### Rule

- `--accent` is **the** highlight color. Use it sparingly — italic display, hover states, primary CTAs, kickers, key icons. If everything is accent, nothing is.
- `--accent-2` is **only** for ambient glow blobs in hero and contact card backgrounds. Don't use it for text or borders.

---

## Typography

Two families, loaded from Google Fonts in every page's `<head>`:

| Family            | Use                                                                  |
|-------------------|----------------------------------------------------------------------|
| **Fraunces**      | Serif display — h1, h2, h3, italic accents, project titles, card heads |
| **Manrope**       | Sans body & UI — paragraphs, nav, buttons, form fields, small uppercase labels |

> No mono font and no second sans. The previous `JetBrains Mono` / `Inter` pairing read as "tech product" — we want "personal art portfolio." If a label needs to feel utility-flavored, use Manrope uppercase tracked. If a label needs to feel personal/handmade, use Fraunces italic lowercase.

### Scale (desktop)

| Class / element        | Family   | Size   | Weight | Notes                                  |
|------------------------|----------|--------|--------|----------------------------------------|
| Hero `h1`              | Fraunces | 96px   | 300    | italic accent on emphasized word       |
| Section `h2` (`.h2`)   | Fraunces | 64px   | 300    | italic accent on emphasized word       |
| Project page `h1`      | Fraunces | 96px   | 300    | matches hero                           |
| `.about-h` / `.contact-h` | Fraunces | 56–72px | 300 | section subtitles                      |
| `.h3` / card titles    | Fraunces | 22–28px| 300–400| italic                                 |
| Body `<p>`             | Manrope  | 16–17px| 400    | line-height ~1.6                       |
| Nav links              | Manrope  | 13px   | 500    | letter-spacing 0                       |
| `.eyebrow` / `.kicker` | Manrope  | 11px   | 500    | uppercase, letter-spacing 0.14–0.18em  |
| Pill button (`.pill`)  | Manrope  | 13px   | 500    | rounded-99                             |
| Meta strips            | Manrope  | 11px   | 500    | uppercase label, italic serif value beneath |
| Form labels (`.cf`)    | Manrope  | 11px   | 500    | uppercase, letter-spacing 0.16em       |

### Mobile scale

Hero/h2 shrink to 56–64px and 44px respectively at `<960px`. The `@media (max-width: 960px)` block in `styles.css` is the source of truth — keep mobile scale changes in that block.

### Italic accent

Fraunces italic is the single "decorative" move. Apply with `<em>` inside display text. Always paint it `--accent`:

```css
.hero-title em { font-style: italic; color: var(--accent); font-weight: 400; }
```

Don't over-italicize. One emphasized phrase per heading.

---

## Spacing

Eyeballed but consistent. Stick to these:

- **Section vertical padding:** 96px desktop / 64px mobile
- **Page horizontal padding:** 56px desktop / 24px mobile
- **Card padding:** 28px (small) / 48–80px (large feature cards)
- **Grid gaps:** 16px (tight grids), 24px (rate grid), 56px (about / hero columns)
- **Element margin (paragraphs etc.):** 18–24px
- **Border radius:** 4px (photos/tiles), 8px (small chips), 10–12px (form fields, cards), 14–16px (feature cards), 99px (pills/CTAs)

---

## Components

### Header (`.hdr`)
Sticky top, blurred bg, three-column grid: logo / nav / CTA + menu-toggle. Drops to two-column at `<960px` with the mobile menu drawer taking over nav.

### Pills (`.pill.pill--primary`, `.pill.pill--ghost`)
The site's CTA pattern. Primary = accent-filled. Ghost = transparent + thin line. Always rounded-99. Always include a `→` glyph for forward actions.

### Section heads (`.section-head`)
Pattern: kicker eyebrow + serif `h2` with italic accent + optional secondary link on the right. Bottom border separator. Used on every home section.

### Photo / video tiles (`.proj`)
Image-first, dark gradient bottom, title + meta + arrow on hover. Sizes: default, `.wide` (2 cols), `.tall` (2 rows), `.large` (2×2).

### Cards (`.about-card`, `.rate-card`, `.contact-aside-card`)
- Background: `--bg-card`
- Border: `1px solid var(--line)`
- Radius: 12–14px
- Padding: 24–28px
- Headers in Fraunces italic, accent color

### Rates sidebar
Vertical list at `<960px`, horizontal scroll tabs on mobile. Active state: marigold left-border (desktop) or bottom-border (mobile) + italic Fraunces label. Don't introduce a "more" or overflow menu — keep category count ≤ 5.

### Forms (`.cf` on contact page)
Bottom-border inputs only, no boxed fields. Labels above in Manrope uppercase with tracking. Submit is a primary pill.

### Project page (`.proj-page`)
- Hero: 2-col grid, `align-items: end` (text bottom-aligned to image)
- Text column wider (~1.3fr), image column narrower (~1fr), image right-aligned and capped at 520×640
- Gallery uses `.proj-gallery` with `.cell` / `.cell.wide` / `.cell.tall` / `.cell.large` modifiers — mix sizes to keep visual rhythm
- Footer CTA card before site footer

---

## Animations

Defined in `styles.css` under `/* ANIMATIONS */`. Two patterns:

### Reveal on scroll
Add `class="reveal"` to anything that should fade-up when it enters the viewport. The shared `initReveals()` in `projects.js` wires the IntersectionObserver.

Stagger with `reveal-d1` … `reveal-d5` (80ms per step) when several siblings should wave in.

### One-shot cascades on load
Hero text children cascade in on initial render via CSS keyframes (`@keyframes rise`). Don't add JS for first-paint animations — use the same pattern.

### Reduced motion
Everything is wrapped in `@media (prefers-reduced-motion: reduce)` that nukes transitions and animations. Any new animation **must** be opt-out via this media query.

---

## Responsive rules

Single breakpoint: **960px**. Above = desktop layout. Below = mobile.

- Mobile-specific changes live in **one** `@media (max-width: 960px)` block at the bottom of each component's CSS section. Don't scatter.
- Mobile nav is always the drawer + hamburger. Never inline links on mobile.
- Hide non-essential UI on mobile (the hero's secondary blob, dense meta strips, etc.) before squeezing it.

---

## How to make a sitewide visual change

Most "what if we tried a different look" experiments come down to swapping the default palette in `:root`. Steps:

1. **Pick new values** for `--bg`, `--ink`, `--accent`, and `--accent-2` (start there — the others derive from those).
2. Edit the `:root` block at the top of `styles.css`.
3. Walk the site (home, contact, thanks, one project page) and check:
   - Photo tiles still pop against the new bg
   - Accent has enough contrast on the bg for CTAs and hover states
   - The marigold-default contact teaser doesn't clash if you went very different
4. If photos look washed out or the accent is fighting them, reconsider. The whole point is to let photography lead.

To **change typography sitewide**, swap the Google Fonts link in each page's `<head>` (or use a find-replace) and adjust the family references in `styles.css`. Three families is the ceiling — adding a fourth makes the typography muddy.

To **change spacing rhythm**, edit the section-padding values in `.section`, `.contact-page`, `.proj-page`. Treat 96px/64px as one variable conceptually (even though they're not yet — could be tokenized if it becomes a frequent change).

---

## Color blocking

The homepage uses hard-edge alternating section backgrounds — no gradients between sections, just sharp cuts. This creates a rhythm similar to a print editorial layout.

### Classes

| Class | Background | Token direction |
|---|---|---|
| (default) | `--bg` (`#F2EDE7` warm off-white) | Light — dark ink |
| `.section--mid` | `#E2DCD5` (warm gray) | Mid — dark ink |
| `.section--dark` | `#141210` (warm near-black) | Dark — overrides all 10 tokens to cream ink + amber accent |

Apply these classes to any `<section>` or `<footer>`. **All CSS tokens cascade automatically** — cards, kickers, borders, buttons all flip without any per-component overrides.

### Current homepage rhythm (index.html)

```
Hero            → section--dark
Marquee         → accent bg (built-in, unchanged)
About           → section--mid
Photography     → (default light)
Rates           → section--mid
Video           → section--dark
IG Feed         → section--mid
Contact Teaser  → section--dark
Footer          → section--dark
```

### Rules

- In `.section--dark`, `--accent` flips to `#D4904E` (amber-ochre) — readable on dark bg.
- In default + `.section--mid`, `--accent` stays `#A55222` (rust) — readable on light bg.
- **Don't mix tokens** within a single section by hardcoding colors — always use the CSS variables so the block theme cascades correctly.
- Two consecutive same-type blocks are fine if their content clearly differentiates them (e.g. Contact + Footer both dark).

---

## What not to add

- A blog/journal section (Lmar would have to write it; don't promise content that doesn't exist)
- Multiple accent colors in the same view
- A second sans-serif or second serif family
- Gradient text or gradient buttons
- Drop shadows on photos (use `.proj::after` gradient or nothing)
- Pre-built component libraries (Tailwind, Bootstrap, etc.)
- Build tooling (the site stays buildless)

---

## Sync rule

Whenever you:
- Add a new color token, font, animation, or component class → **document it here**.
- Introduce a new spacing or radius value → either match an existing one, or update the spacing scale section.
- Change a global pattern (header, footer, pills) → update the relevant section above.

Stale design docs cause inconsistency. Inconsistency cheapens the site.

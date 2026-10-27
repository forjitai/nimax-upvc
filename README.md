# NIMAX UPVC website

Website for **NIMAX UPVC** — UPVC profiles and UPVC windows, Kittanahalli, Kadabagere Road, Bengaluru.

- **Code:** GitHub `forjitai/nimax-upvc` (branch `main`)
- **Hosting:** Vercel (team *forjitai-9589's projects*, project *nimax-upvc-website*). Every push to `main` goes live automatically in 1–2 minutes.
- **Built with:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Lucide icons. All pages are pre-built (static), so the site is fast and needs no server or database.

---

## Where things live — edit one file, the whole site updates

| To change… | Edit | Notes |
|---|---|---|
| Name, addresses (`locations`), phone numbers, WhatsApp message, maps | `src/config/business.ts` | Used in header, footer, contact page, forms and Google data |
| Colours | `src/config/theme.css` | Blue `--nx-primary`, gold `--nx-accent`, etc. |
| UPVC profiles (44) | `src/config/profiles.ts` | One line per profile |
| UPVC window types (11) | `src/config/products.ts` | Text for each window page |
| Blog articles | `src/content/blog.ts` | One block per article |
| Menu items | `src/config/navigation.ts` | |
| Homepage UPVC benefits | `src/config/benefits.ts` | Shared with About page |
| Gallery photos | `src/config/gallery.ts` + `public/images/gallery/` | Gallery stays hidden from Google until photos are added |
| Logo | `public/icons/logo-nimax.png` and `logo-nimax-white.png` | Keep file names; transparent PNG, ratio about 3 : 1 |
| Share image (WhatsApp/Facebook preview) | `public/og/nimax-share.png` | 1200 × 630 |

Editing on GitHub works fine: open the file on github.com → pencil icon → change → **Commit changes**. Vercel publishes it.

---

## How-to guides

### Change a phone number
`src/config/business.ts` → `phones`. Each number has three forms; change all three:
`display: "+91 91138 08442"`, `e164: "+919113808442"`, `whatsapp: "919113808442"`.

### Change a colour
`src/config/theme.css` → change the hex value, e.g. `--nx-primary: #22247e;`. Check text stays readable (contrast checker: webaim.org/resources/contrastchecker).

### Add a UPVC profile
`src/config/profiles.ts` → copy a line in the right group and edit it:
```ts
P("70mm-casement-sash", "70mm Casement Sash UPVC Profile", "sashes", "Casement sash", "70 mm", "2 mm", "Casement windows that open inward"),
//  slug (URL)           name                               group     type             width    wall     used for
```
Groups: `frames`, `sashes`, `mullions`, `beads`, `mesh`, `panels`. Leave width or thickness as `undefined` if unknown. The page, menu filter, sitemap and Google data update themselves.

### Add photos to a profile or window
1. Put the photo in `public/images/products/` (JPG or WebP, at least 1200 px wide, a clear file name like `55mm-sliding-profile-01.jpg`).
2. In `src/config/products.ts` (windows) add to that product's `photos`, or ask a developer to add a `photos` field to the profile:
   ```ts
   photos: [{ src: "/images/products/55mm-sliding-profile-01.jpg", alt: "55mm sliding UPVC profile cross-section", width: 1600, height: 1200 }]
   ```
   Photos replace the drawing automatically and are resized and compressed by Next.js.

### Add gallery photos
Put photos in `public/images/gallery/` and list them in `src/config/gallery.ts` (example inside the file). The Gallery page then becomes visible to Google and joins the sitemap.

### Write a blog article
`src/content/blog.ts` → copy an article block, give it a new `slug`, `title` (≤ 60 characters), `description` (≤ 155), `date`, `category` (`choosing`, `profiles` or `care`), `minutes`, and sections. Keep facts general and true — no invented prices, test figures or customer stories.

### Connect Google Search Console, Analytics or a domain
See `docs/search-console-and-analytics.md`. Settings are Vercel environment variables:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your own domain once added, e.g. `https://www.nimaxupvc.com` (otherwise the Vercel address is used) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console HTML-tag code |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID `G-…` (optional; nothing loads without it) |

After changing a variable: Vercel → Deployments → latest → **Redeploy**.

---

## Developer notes

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (must pass before pushing)
npx tsc --noEmit && npm run lint
```

Tests (Python + Playwright, against a running production build on port 3100):
```bash
npm run build && npx next start -p 3100 &
python3 tests/site_check.py http://localhost:3100 /tmp/shots     # every page: status, H1, titles, descriptions, canonicals, overflow, images
python3 tests/phase3_home_check.py http://localhost:3100 /tmp/shots   # homepage SEO, links, structured data
python3 tests/phase2_check.py http://localhost:3100 /tmp/shots   # menus, form validation, WhatsApp hand-off, lightbox
python3 tests/jsonld_check.py http://localhost:3100              # structured data on every sitemap page
```

Rules for content: only verified facts. No invented founding year, staff numbers, certifications, warranties, prices, ratings or reviews.

This Next.js version has breaking changes from older ones; read `node_modules/next/dist/docs/` before changing framework code (see `AGENTS.md`).

## Documents
- `docs/fenstas-audit.md`, `docs/fenstas-roadmap.md` — reference-site audit and phase plan
- `docs/design-system.md` — colours, fonts, components, logo
- `docs/search-console-and-analytics.md` — Google setup, domain, Fenstas clean-up
- `docs/qa-report.md` — test and Lighthouse results

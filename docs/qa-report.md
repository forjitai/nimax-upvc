# QA report (25 Oct 2026)

Tested against a local production build (`next build` + `next start`), the same output Vercel serves.

## Automated tests

| Suite | Result | What it checks |
|---|---|---|
| `tests/site_check.py` | **11/11 passed, 72 pages** | Every page returns 200 · one H1 per page · no skipped heading levels · unique titles ≤ 65 chars · unique descriptions 70–165 chars · canonical on every indexable page, pointing to itself · no horizontal scroll at 390 px and 1366 px · no broken images · no console errors · all images have alt text |
| `tests/phase3_home_check.py` | **23/23 passed** | Homepage at phone/tablet/desktop · title, description, canonical, Open Graph · both call and WhatsApp numbers · structured data with no invented fields · accessible names on all links/buttons |
| `tests/phase2_check.py` | **34/34 passed** | Desktop mega menu, mobile drawer (open/close/Escape) · form validation (name, Indian mobile) · WhatsApp hand-off message contains the form details · honest status text (never says "sent") · lightbox keyboard control · skip link |
| `tests/jsonld_check.py` | **70 pages, no problems** | Organization (70), BreadcrumbList (69), Article (6), ItemList (2), FAQPage, WebSite, HomeAndConstructionBusiness |

Other checks: unknown URLs return a real 404; removed product URLs return 308 redirects to `/products`; `sitemap.xml` lists 70 indexable URLs; `robots.txt` allows crawling in production and blocks Vercel preview deployments; every page has the 1200×630 share image.

## Lighthouse (Lighthouse 12, local build)

Mobile uses Lighthouse's simulated slow 4G and mid-range phone, so mobile performance on the real Vercel CDN is usually the same or better.

| Page | Device | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|---|
| / | mobile | 89 | 100 | 100 | 100 | 3.4 s | 0 |
| / | desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 |
| /products/upvc-profiles | mobile | 96 | 96 | 100 | 100 | 2.5 s | 0 |
| /products/upvc-profiles | desktop | 100 | 96 | 100 | 100 | 0.7 s | 0 |
| /products/upvc-windows/sliding-windows | mobile | 96 | 100 | 100 | 100 | 2.6 s | 0 |
| /products/upvc-windows/sliding-windows | desktop | 100 | 100 | 100 | 100 | 0.8 s | 0 |
| /about | mobile | 92 | 96 | 100 | 100 | 3.1 s | 0 |
| /about | desktop | 100 | 96 | 100 | 100 | 0.7 s | 0 |
| /contact | mobile | 90 | 100 | 100 | 100 | 3.5 s | 0 |
| /contact | desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 |
| /blog | mobile | 91 | 96 | 100 | 100 | 3.4 s | 0 |
| /blog | desktop | 100 | 96 | 100 | 100 | 0.7 s | 0 |

After this run, three small contrast fixes (filter counts, small gold labels on blue) raised accessibility to **100** on `/products/upvc-profiles`, `/about` and `/blog` as well (re-tested).

Fixes made during QA: WhatsApp green darkened for contrast (#157A3F, 5.3 : 1) · lighter gold `--nx-accent-light` for small text on blue · slideshow dots enlarged to 24 px tap targets · share image added to every page.

## Known limitations

- No real photos yet: product, profile and gallery images are drawings; Gallery is hidden from Google until photos are added.
- Contact form hands the enquiry to WhatsApp (visitor presses Send). A form that emails NIMAX directly needs an email address and an email service.
- Map on the Contact page searches by address (no coordinates were supplied); confirm it shows the right place.
- Five Fenstas profile sizes contradicted their own names and were left out (see `docs/fenstas-roadmap.md`).
- Search Console, Analytics and a custom domain are ready but need the owner's Google account / domain (see `docs/search-console-and-analytics.md`).

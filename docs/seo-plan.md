# SEO Plan — NIMAX UPVC

Status: Phase 1 draft. Keyword themes are limited to products and services **you confirm** in the sitemap approval. No rankings or indexing timelines are promised.

## 1. Lessons from the reference site

| Reference practice | Effect | NIMAX approach |
|---|---|---|
| Title pattern "[Product] - [Sub-product] Manufacturer from Faridabad" | Clear and local, but repetitive | Keep the clear product + city pattern, without repeating phrases |
| 12 "Upvc Windows Suppliers in [City]" entries reusing one description | Thin, duplicate, doorway-style content; a known spam signal | Not used. No pages for areas you don't serve |
| One French-door description reused on ~15 products | Duplicate content; mismatched pages | Unique copy per product page |
| Products as `#anchors` on category pages | Products can't rank on their own URL | One URL per confirmed product |
| Generic alt text = product name on every photo | No image-search value | Alt text describing each photo |
| Duplicate categories (Aluminum/Aluminium) | Splits signals between two URLs | One canonical URL per topic |
| Wrong og:image sizes, invalid meta tag | Broken social previews | Correct Open Graph per page |
| Factsheet with GST, year, turnover | Trust signal | Only facts you supply |

## 2. Business data (NAP) — single source of truth

Stored in `src/config/business.ts` and used everywhere (header, footer, contact page, structured data):

```
Name:     NIMAX UPVC
Address:  Kittanahalli, Kadabagere Rd, Byandahalli, Bengaluru, Karnataka 562130, India
Phone 1:  +91 91138 08442
Phone 2:  +91 79751 77812
```

The same name, address and phone must appear identically on the website, Google Business Profile, IndiaMART/JustDial listings (if any) and social profiles. Inconsistent NAP weakens local ranking.

## 3. Keyword themes (to confirm against your product list)

| Theme | Example searches | Target page |
|---|---|---|
| Core | UPVC windows Bangalore, UPVC windows Bengaluru, UPVC doors Bangalore | Home, `/products/upvc-windows`, `/products/upvc-doors` |
| Window types | UPVC sliding windows, UPVC casement windows, tilt and turn windows Bangalore | Matching product page |
| Door types | UPVC sliding door, UPVC French door, UPVC bathroom door | Matching product page |
| Mesh | mosquito mesh door Bangalore, UPVC mesh window | Mesh pages |
| Service | UPVC window installation Bangalore, UPVC window replacement | `/services/installation` |
| Supplier intent | UPVC window manufacturer Bangalore, UPVC window supplier | Home, About |
| Aluminium | aluminium sliding windows Bangalore, aluminium glass partition | Aluminium pages |
| Near-me | UPVC windows near me | Served by Google Business Profile + consistent NAP, not by a page |

Keyword volumes have not been researched yet (no keyword tool connected). Once the product list is confirmed I will validate these themes; you can also share Google Search Console data after launch.

**Service area:** Only the address locality (Bengaluru) is used until you tell me which areas you actually serve. No neighbourhood landing pages unless you confirm real work there.

## 4. On-page templates

| Page type | Title (≤ 60 chars) | Meta description (≤ 155 chars) | H1 |
|---|---|---|---|
| Home | UPVC Windows & Doors in Bengaluru \| NIMAX UPVC | Unique, mentions products + Bengaluru + call action | UPVC Windows and Doors in Bengaluru |
| Category | UPVC [Category] in Bengaluru \| NIMAX UPVC | What the category includes + quote action | UPVC [Category] |
| Product | UPVC [Type] in Bengaluru \| NIMAX UPVC | What it is, where it suits, quote action | UPVC [Type] |
| Installation | UPVC Window Installation in Bengaluru \| NIMAX UPVC | — | UPVC Window and Door Installation |
| About | About NIMAX UPVC \| UPVC Windows Bengaluru | — | About NIMAX UPVC |
| Gallery | UPVC Window & Door Projects \| NIMAX UPVC | — | Our Work |
| Contact | Contact NIMAX UPVC \| Call, WhatsApp, Directions | — | Contact NIMAX UPVC |

Each page: one H1, H2/H3 in order, canonical URL, Open Graph title/description/image, breadcrumb, at least 2 internal links to related products, and a quote CTA.

## 5. Technical SEO

- Next.js App Router with static generation for all content pages (fully crawlable HTML).
- `app/sitemap.ts` → `/sitemap.xml` listing only canonical, indexable 200 URLs.
- `app/robots.ts` → allow all; points to sitemap. Preview deployments get `noindex` automatically via an environment check so they never compete with production.
- `metadataBase` from one `SITE_URL` variable, so canonicals switch cleanly when a custom domain is added.
- Custom 404 (`noindex`), correct 404 status.
- Trailing-slash and lowercase URL policy fixed in config; no duplicate paths.
- Images through `next/image` (AVIF/WebP, explicit sizes, lazy below the fold, priority on hero).
- Fonts via `next/font` (self-hosted, no layout shift).

## 6. Structured data (JSON-LD)

| Type | Where | Fields used | Pending |
|---|---|---|---|
| `Organization` | Site-wide | name, url, logo, telephone ×2 | Logo file |
| `WebSite` | Home | name, url | — |
| `HomeAndConstructionBusiness` (a `LocalBusiness` subtype) | Home, Contact | name, address, telephone ×2, url, image, areaServed: Bengaluru | **Confirm category.** Opening hours and coordinates only if you supply them |
| `BreadcrumbList` | All inner pages | auto-generated from route | — |
| `Product` | Not planned | — | Google expects price/review/offer data for product rich results; none will be invented. Can be added later if you want prices on the site |
| `FAQPage` | Not planned | — | Google limits FAQ rich results to authoritative government/health sites; plain FAQ content is still useful on page |

All JSON-LD validated with Google's Rich Results Test and the Schema.org validator before release (Phase 7).

## 7. Local SEO actions outside the website (your side)

1. **Google Business Profile** — create or claim it with the exact NAP above; category "Window supplier" or "Window installation service"; add photos. This drives "near me" and Maps results more than any website change.
2. Ask genuine customers for Google reviews. (Reviews are never written or added to the site by me.)
3. Keep any IndiaMART / JustDial listings consistent with the same NAP and link to the new website.

## 8. Measurement

- Google Search Console: verify via DNS or HTML tag once the domain is live; submit `/sitemap.xml`.
- Google Analytics 4: optional, enabled only when you provide a real Measurement ID (`NEXT_PUBLIC_GA_ID`). Events planned: `click_call` (per number), `click_whatsapp` (per number), `click_directions`, `submit_enquiry` (on confirmed success only).

## 9. Open questions for you

1. Domain name: do you have one (e.g. nimaxupvc.com / .in)? Canonical URLs depend on it.
2. Which areas of Bengaluru (and outside) do you actually serve?
3. Business category for Google: manufacturer, supplier, installer, or all three?
4. Do you want prices shown on the website?
5. Opening hours (optional, for structured data and Google Business Profile).

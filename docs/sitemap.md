# Sitemap — Reference Audit and Proposed NIMAX UPVC Sitemap

Audit date: 24 Oct 2026
Reference: https://www.upvcalphawindows.com/ (IndiaMART "TDW" seller template)

---

## Part A — Reference site: complete public sitemap (as found)

30 public HTML pages were found and fetched. Source of truth: the site's own `/sitemap.html`, cross-checked against the header, sidebar and footer navigation on every page.

### A1. Core pages (7)

| # | URL | Page | Linked from |
|---|-----|------|-------------|
| 1 | `/` | Home | Header, footer, logo |
| 2 | `/profile.html` | About Us | Header, footer |
| 3 | `/testimonial.html` | Testimonials | Sitemap page only (child of About Us) |
| 4 | `/doors-and-windows.html` | Products & Services (hub) | Header, footer |
| 5 | `/photos.html` | Photos (resolves to `/gallery.html`) | Footer |
| 6 | `/enquiry.html` | Contact Us | Header, footer |
| 7 | `/sitemap.html` | Site Map | Footer |

### A2. Product category pages (23)

Each category page lists one or more products as on-page sections, reached with `#anchor` links (for example `/upvc-window.html#upvc-sliding-window`). There are **no separate product detail URLs**; products are anchors within category pages.

| # | URL | Category | Products on page |
|---|-----|----------|------------------|
| 1 | `/upvc-window.html` | UPVC Window | 25 sections (sliding, tilt & turn, fixed, top hung, bay, ventilation ×2, mesh sliding, French, casement, 12 location-keyword "suppliers in …" entries, soundproof, folding door, glass window) |
| 2 | `/upvc-door.html` | UPVC Door | 11 (mesh, French, folding, sliding, casement, bathroom, patio, aluminium glass sliding door, casement windows, fold & slide, hardware) |
| 3 | `/aluminum-window.html` | Aluminum Window | 7 (fixed, sliding, French, top hung, tilt & turn, arched, casement) |
| 4 | `/aluminium-door.html` | Aluminium Door | 8 (casement, sliding folding, mosquito mesh, sliding ×2, French, modular, folding) |
| 5 | `/aluminium-window.html` | Aluminium Window (duplicate category) | 3 (sliding, hinged, door window) |
| 6 | `/upvc-sliding-window.html` | Upvc Sliding Window | 2 (installation service Delhi NCR, material suppliers) |
| 7 | `/upvc-casement-door.html` | Upvc Casement Door | 2 (casement doors, bi-fold door) |
| 8 | `/upvc-glass-door.html` | Upvc Glass Door | 2 (glass door, "Prominance" windows & doors) |
| 9 | `/aluminium-glass-partition.html` | Aluminium Glass Partition | 1 |
| 10 | `/window-installation-service.html` | Window Installation Service | 1 |
| 11 | `/upvc-kitchen-windows.html` | UPVC Kitchen Windows | 1 |
| 12 | `/upvc-mesh-window.html` | Upvc Mesh Window | 1 |
| 13 | `/mosquito-mesh-door.html` | Mosquito Mesh Door | 1 |
| 14 | `/upvc-window-installation-service.html` | UPVC Window Installation Service (duplicate service) | 1 |
| 15 | `/aluminium-glass-skylight.html` | Aluminium Glass Skylight | 1 |
| 16 | `/upvc-exterior-window.html` | UPVC Exterior Window | 1 |
| 17 | `/upvc-combination-window.html` | Upvc Combination Window | 1 |
| 18 | `/upvc-folding-window.html` | UPVC Folding Window | 1 |
| 19 | `/upvc-fixed-door.html` | UPVC Fixed Door | 1 |
| 20 | `/upvc-tilt-slide-door.html` | UPVC Tilt & Slide Door | 1 |
| 21 | `/upvc-swing-door.html` | UPVC Swing Door | 1 |
| 22 | `/upvc-hinged-door.html` | Upvc Hinged Door | 1 |
| 23 | `/new-items.html` | New Items | 2 (sliding windows, aluminium bathroom door) |

### A3. Not present on the reference

- No blog or informational/guide pages
- No project/case-study pages (only the product photo grid on `/photos.html`)
- No FAQ page
- No privacy policy (Terms of Use links out to indiamart.com)
- No separate product detail URLs

### A4. External links

IndiaMART Terms of Use, IndiaMART corporate, indiamart.com logo, Google Maps (coordinates link on contact page), Facebook/Twitter/LinkedIn share links.

---

## Part B — Proposed NIMAX UPVC sitemap (FOR APPROVAL)

Principles:
- Keep the reference's information architecture (Home → About → Products hub → category pages → Gallery → Contact) and its sidebar-style product navigation.
- **Fix its structural problems:** merge the duplicate "Aluminum/Aluminium Window" and the two installation-service pages; drop the 12 location-keyword "Upvc Windows Suppliers in …" entries (doorway-style keyword stuffing that Google treats as low quality); give each confirmed product its own URL instead of an anchor.
- **Only products you confirm** get a page. Every product page below is marked ☐ until you tick it.

```
/                                   Home
/about                              About NIMAX UPVC
/products                           Products & Services (hub)
│
├── /products/upvc-windows          UPVC Windows (category)
│   ├── ☐ /products/upvc-windows/sliding-windows
│   ├── ☐ /products/upvc-windows/casement-windows
│   ├── ☐ /products/upvc-windows/tilt-and-turn-windows
│   ├── ☐ /products/upvc-windows/fixed-windows
│   ├── ☐ /products/upvc-windows/top-hung-windows
│   ├── ☐ /products/upvc-windows/french-windows
│   ├── ☐ /products/upvc-windows/combination-windows
│   ├── ☐ /products/upvc-windows/folding-windows
│   ├── ☐ /products/upvc-windows/bay-windows
│   ├── ☐ /products/upvc-windows/ventilator-windows   (kitchen / bathroom)
│   └── ☐ /products/upvc-windows/mesh-windows
│
├── /products/upvc-doors            UPVC Doors (category)
│   ├── ☐ /products/upvc-doors/sliding-doors
│   ├── ☐ /products/upvc-doors/casement-doors        (hinged / swing)
│   ├── ☐ /products/upvc-doors/french-doors
│   ├── ☐ /products/upvc-doors/folding-doors         (bi-fold / slide & fold)
│   ├── ☐ /products/upvc-doors/tilt-and-slide-doors
│   ├── ☐ /products/upvc-doors/patio-doors
│   ├── ☐ /products/upvc-doors/bathroom-doors
│   └── ☐ /products/upvc-doors/mesh-doors            (mosquito mesh)
│
├── ☐ /products/aluminium-windows   (single page, variants as sections)
├── ☐ /products/aluminium-doors     (single page, variants as sections)
├── ☐ /products/glass-partitions
└── ☐ /products/skylights
│
/services/installation              ☐ UPVC Window & Door Installation
/gallery                            Project & product photos
/contact                            Contact, WhatsApp, directions, enquiry form
/privacy                            Privacy policy (needed once the form collects phone numbers)
/testimonials                       ☐ Only if you supply genuine customer reviews
/404                                Custom not-found page (not indexed)

Technical: /sitemap.xml, /robots.txt
```

Page count if everything is ticked: 7 core + 4 category/hub + 25 product/service = **36 pages**.
Minimum viable (core pages + category pages only, products as sections): **11 pages**.

### Mapping: reference → proposed

| Reference page(s) | Proposed page | Change |
|---|---|---|
| `/` | `/` | Same role |
| `/profile.html` | `/about` | Only verified facts; no invented year, staff, turnover, clients |
| `/testimonial.html` | `/testimonials` | Only if genuine reviews supplied |
| `/doors-and-windows.html` | `/products` | Same role |
| `/upvc-window.html`, `/upvc-sliding-window.html`, `/upvc-kitchen-windows.html`, `/upvc-mesh-window.html`, `/upvc-exterior-window.html`, `/upvc-combination-window.html`, `/upvc-folding-window.html`, `/new-items.html` (sliding) | `/products/upvc-windows` + children | Merged; one URL per window type |
| `/upvc-door.html`, `/upvc-casement-door.html`, `/upvc-glass-door.html`, `/mosquito-mesh-door.html`, `/upvc-fixed-door.html`, `/upvc-tilt-slide-door.html`, `/upvc-swing-door.html`, `/upvc-hinged-door.html` | `/products/upvc-doors` + children | Merged; hinged/swing/fixed folded into casement unless you want them separate |
| `/aluminum-window.html`, `/aluminium-window.html` | `/products/aluminium-windows` | Duplicate removed |
| `/aluminium-door.html`, `/new-items.html` (bathroom door) | `/products/aluminium-doors` | Merged |
| `/aluminium-glass-partition.html` | `/products/glass-partitions` | Same |
| `/aluminium-glass-skylight.html` | `/products/skylights` | Same |
| `/window-installation-service.html`, `/upvc-window-installation-service.html` | `/services/installation` | Duplicate removed |
| `/photos.html` | `/gallery` | Your own photos only |
| `/enquiry.html` | `/contact` | Adds real form, WhatsApp ×2, map directions |
| `/sitemap.html` | `/sitemap.xml` (+ footer links) | HTML sitemap not needed |
| 12 "Upvc Windows Suppliers in [city]" sections | — | Dropped (keyword stuffing; NIMAX does not serve those cities) |

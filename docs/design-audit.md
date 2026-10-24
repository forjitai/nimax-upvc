# Design Audit — Reference Site

Audit date: 24 Oct 2026

## Limitation: what could and could not be measured

| Item | Status | Why |
|---|---|---|
| Page structure, section order, headings, links, CTAs | ✅ Recorded | From fetched page content (all 30 pages) |
| Image placement, sizes, counts | ✅ Recorded | From image URLs (size encoded in filename) and markup |
| Interactive features | ✅ Recorded (behaviour inferred from markup) | — |
| **Exact colours (hex values)** | ❌ Not measured | The build workspace's network blocks the reference domain (HTTP 403 at proxy), so the stylesheet could not be downloaded. The page-reading tool returns text, not CSS. |
| **Fonts, font sizes, spacing, border radius, shadows** | ❌ Not measured | Same reason |
| **Animations / transitions** | ❌ Not measured | Same reason |
| **Responsive breakpoints / mobile menu** | ❌ Not measured | Same reason |
| Screenshots at fixed viewports | ❌ Not taken | No browser available in this phase |

**How to close the gap (needs your OK):** I can open the reference in a browser (Claude in Chrome, if you have the extension) and take screenshots at 390 px, 768 px and 1440 px, then read computed colours and fonts. Alternatively, send me 3 screenshots (phone, tablet, desktop) of the homepage and one product page.

No colour or font values have been guessed in this document.

---

## 1. Template identification

The reference is a standard **IndiaMART TDW seller template** ("Developed and Managed by IndiaMART InterMESH Limited"). Its layout, product card, enquiry pop-ups and footer are the template's, not a custom design. Thousands of IndiaMART sellers share this structure.

Implication: "closely follow the reference" in practice means following its **information architecture and conversion pattern**, which is what makes it work for B2B/B2C leads. Its visual finish is generic, so the NIMAX identity has room to be noticeably more polished while keeping the same structure.

## 2. Layout structure

| Region | Pattern observed |
|---|---|
| Top bar | Logo left; company name + city + GST under it; contact actions (Send Email, phone, response rate) and search on the right |
| Main navigation | 4 items, horizontal: Home · About Us · Products & Services · Contact Us. No dropdowns in the main nav; product depth lives in the sidebar |
| Breadcrumb | Text breadcrumb under nav on all inner pages: `Home » Section » Page` |
| Body | Two columns on desktop: main content + product-category sidebar (collapsible tree) |
| Home | No hero image/slider in markup. Opens with quick product links, then category list, then company factsheet + intro text |
| Category page | H1 → one-line intro → stacked full-width product cards |
| Product card | Image gallery left (main + thumbs), details right (price, spec table, description, CTA row) |
| Gallery | Uniform square-thumbnail grid with product name + quote link under each |
| Contact | Text blocks only; map is a link, not an embed |
| Footer | Single row of text links, copyright, IndiaMART credit |

## 3. Visual hierarchy

1. Company name and contact actions (phone, email) dominate the top of every page.
2. Product names (H2) and price lines are the strongest elements on category pages.
3. CTAs repeat 3–4 times per product ("Request Callback", "Get Best Quote", "Yes! I am Interested").
4. Trust signals sit near the top of Home/About: TrustSeal, GST, years, turnover, employees.

## 4. Image treatment

| Use | Displayed size | Source size | Aspect ratio |
|---|---|---|---|
| Logo | 120×120 | 120×120 | 1:1 |
| Category card image | 250×250 | 500×500 | 1:1 |
| Product main image | 250×250 | 500×500 | 1:1 |
| Product thumbnails | 125×125 | 500×500 | 1:1 |
| About-page facility photos | 500×500 | 500×500 | 1:1 |
| Gallery thumbnails | square tiles | 500×500 | 1:1 |

Everything is cropped **square**. Product photos are mostly installed windows/doors on site, plus some manufacturer catalogue renders (e.g. a Koemmerling banner image). Several products have no photo at all (11 of 23 category cards).

## 5. Buttons and CTAs

| Label | Where | Destination |
|---|---|---|
| Send Email | Top bar | IndiaMART enquiry form |
| Request Callback | Every product | IndiaMART lead form |
| Get Best Quote / Get Quotation | Every product, gallery tiles | IndiaMART lead form |
| Get Latest Price / Ask for Price | Price line | IndiaMART lead form |
| Product Brochure | Some products | PDF on IndiaMART CDN |
| Yes! I am Interested | Every product and category card | IndiaMART lead form |
| View Map / Get Direction | Contact page | Google Maps (lat/long) |
| Contact via E-mail / SMS | Contact block | IndiaMART form |

Pattern to keep: **one clear quote action per product, repeated where the visitor decides.** Pattern to drop: four near-identical buttons per product.

## 6. Typography, colour, spacing

Not measured (see limitation). Structural observations only:
- Title-case product names with inconsistent casing (UPVC / Upvc / uPVC).
- Dense text blocks; spec tables are plain two-column label/value grids.
- Spec labels are IndiaMART's standard taxonomy (Minimum Order Quantity, Glass Type, Window Open Style, Frame Color, Usage, Brand, Country of Origin).

## 7. What to carry into NIMAX UPVC

| Keep | Improve | Drop |
|---|---|---|
| 4-item top nav + breadcrumb | Add a real hero with an installed-window photo and two CTAs (Call, WhatsApp) | IndiaMART branding, TrustSeal, "Response Rate" |
| Products hub → category → product structure | Give each product its own URL and page | Location-keyword product entries |
| Product card: gallery + spec table + quote CTA | Spec tables only with your verified values; descriptions written per product | Reused French-door description |
| Persistent product sidebar on inner pages | Collapses to a drawer on mobile | Duplicate categories |
| Contact block repeated on every page | Click-to-call ×2, WhatsApp ×2, working directions link | Fake "sent successfully" text |
| Square product imagery | Keep 1:1 for cards; add 16:9/4:3 for hero and gallery | Products with no image |
| Photo gallery grid | Add categories and a lightbox | Prices on every tile (unless you want prices shown) |

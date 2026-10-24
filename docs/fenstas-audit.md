# Fenstas Reference Audit (Redesign Phase 1)

Audit date: 25 Oct 2026 · Reference: https://fenstas.com/ (WordPress + Elementor + WooCommerce)

## Key findings

1. **Same phone numbers as NIMAX.** Fenstas's footer and contact page list **+91 91138 08442** and **+91 79751 77812** (NIMAX's two numbers) plus a third, **+91 88611 47924**. Fenstas and NIMAX appear to be the same owner or closely connected. If so, Fenstas's product list, specifications and photos may be reusable **with the owner's written OK**.
2. **Fenstas's site has been compromised.** Its blog lists ~70 spam posts (casino, betting, APK downloads) and the homepage carries a hidden casino link. These are typical of a hacked WordPress site. Nothing from the Fenstas blog should be copied, and the owner should be told.
3. **Fenstas's contact page is unfinished template content:** a New York address, a London map, an example.com email and "11am–7pm" store hours that do not belong to the business.
4. **No colours or fonts could be read** (text-only fetch). Screenshots from the owner are needed to match the look.

## Sitemap

| Page | URL | Notes |
|---|---|---|
| Home | `/` | See section order below |
| About Us | `/about-us/` | Identity, origin story (2023, founder named), future direction, 6 "why choose" cards, CTA banner |
| Our Products | `/products/` | 52 products, 16 per page, 4 pages; grid with 1–5 column switch and sorting |
| Category: UPVC Profile | `/product-category/upvc-profile/` | 40 products |
| Category: UPVC Window | `/product-category/upvc-window/` | Linked from home |
| Product detail | `/product/<slug>/` | e.g. 55mm Sliding UPVC Profile |
| Blog & Insights | `/blog/` | Spam only (see finding 2) |
| Contact Us | `/contact-us/` | Template placeholders (see finding 3) |

Footer "Our Range" also lists Doors & Window Systems, Fittings & Accessories and Fabrication Enquiries, which link to Products or Contact rather than their own pages.

## Homepage section order

1. Full-width hero photo, label "Fenstas · uPVC Solutions", headline, intro, **Explore Products** + **Get a Quote**
2. Image/text block: Windows (sliding, casement, fixed, tilt & turn) → **Explore Windows**, **Discuss Your Project**
3. Image/text block: Profiles for fabricators → **View uPVC Profiles**, **Bulk Enquiry**
4. Image/text block: Renovations and new builds → **Request a Quotation**, **About Fenstas**
5. Auto-rotating image carousel with Pause, caption "Profiles · Windows · Doors · Fabrication"
6. Stat "2023 Established" + "Quality & Design" label + tagline
7. About block with 4-item checklist → **More About**, **Explore Our Products**
8. "Our uPVC Profiles" — 8 product cards + **View All Products**
9. Brand paragraph (residential, commercial, corporate, industrial)
10. Five value points (approach, delivery, reach, innovation, value)
11. Full-width projects image + text
12. Six benefit cards: Weather Proof, Antifungal & Anti-termite, Low Maintenance, Thermal, Acoustic, Fire Resistant
13. FAQ (8 items) with "Planning a project?" callout
14. CTA "Let's build better spaces" → **Request a Quote**
15. Footer: logo + tagline + "PROFILES · WINDOWS · DOORS"; Explore; Our Range; Let's Connect (3 phones, Send an Enquiry); copyright; floating **WhatsApp us**; back-to-top

## Product catalogue pattern

**Listing:** image, linked name, "Read more", rating (0). No prices, no cart. Sorting: default, popularity, rating, latest, price. Column switch 1–5.

**Product names seen (UPVC profiles):** 112mm 3 Track · 112mm Door Sash Cover · 2.5 Track · 20/150mm Door Panel · 45mm Small Casement Frame · 52mm Mesh Sliding · 55mm Sliding · 57mm Sash · 57mm Sliding Sash · 5mm Casement Single Glazing Bead · 5mm Glazing Bead 90 Series · 5mm Sliding Bead · 60 Out Swing Door Sash · 60/45mm Two Track · 60mm Bay Pole · 60mm Blend Lower · 60mm Coupler · 88mm Sash Mullion · 90mm 2.5 Track · Round Bead · T Mullion … (52 in total).

**Product detail:** breadcrumb (Home › UPVC Profile › Product) · previous/next product links · 6 images with thumbnails · bulleted attributes · spec fields **Material, Profile Type, Width/Depth, Thickness, Technique, Color, Brand** · Description tab (function, material, dimensions, colour, applications, maintenance, benefits) · Reviews tab (empty) · 10 related products · no price, no product-specific quote form.

## What NIMAX will do better

| Fenstas | NIMAX |
|---|---|
| Product pages have no quote form | Each product page has its own WhatsApp enquiry with the product pre-filled |
| Empty "Reviews (0)" on every product | No review widgets until genuine reviews exist |
| Payment-logo "safe checkout" with no checkout | Removed (nothing is sold online) |
| Spam blog | Original, useful guides |
| Template contact details | Real address, both numbers, real directions link |
| H1 is the logo on every page | One descriptive H1 per page (better SEO) |
| Blog sidebars on the product page | Clean product filters by profile type |

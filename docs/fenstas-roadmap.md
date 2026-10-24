# Fenstas-Style Redesign: Phased Roadmap

Each phase ends with screenshots, test results and a request for approval.

| # | Phase | What gets built | Needs from owner | Status |
|---|---|---|---|---|
| 1 | **Audit** | Every Fenstas page studied; findings and this plan | — | ✅ Done |
| 2 | **Look & feel** | Match Fenstas colours, fonts, button shapes, spacing; hero and section styling | Phone screenshots of fenstas.com (top, middle, footer) | Waiting |
| 3 | **Homepage, full detail** | Fenstas section order (already live) refined: brand paragraph, projects banner, stat block (only real numbers), photo slots ready | Photos (optional now) | Draft live |
| 4 | **Profile catalogue** | `/products` grid with filter by type (frame, sash, track, bead, mullion…) and sort; one page per profile with spec table (Material, Type, Width, Thickness, Colour, Brand), image gallery, previous/next, related profiles, product-specific WhatsApp enquiry | Profile list with specs (or OK to use Fenstas's list), profile photos | Waiting |
| 5 | **Windows catalogue** | Window category grid matching Fenstas cards; 11 window pages restyled with gallery + specs slots | Which window types are actually made; photos | Ready to start |
| 6 | **About page** | Identity · story · future direction · 6 "why choose" cards · CTA, Fenstas order | Founding year, founder name, story (only if owner wants them shown) | Ready (facts optional) |
| 7 | **Contact page** | Contact cards (address, both numbers, WhatsApp, hours), Google Map of the real address, enquiry form, "Get in touch" block | Opening hours, email (optional), 3rd number? | Ready to start |
| 8 | **Blog & Insights** | Fenstas-style card grid, categories, more guides | Topics the owner wants (optional) | 3 posts live |
| 9 | **SEO** | Titles, descriptions, Product + Breadcrumb + FAQ structured data, sitemap, Search Console guide | Domain (optional) | — |
| 10 | **Speed, accessibility, QA** | Lighthouse scores recorded, full Playwright run on live site | — | — |
| 11 | **Handover** | Guides: add a profile, add a photo, change colours, write a blog post | — | — |

## Phase 4 delivered (25 Oct 2026): profile catalogue

- 44 UPVC profiles from the Fenstas product list (same business: shared phone numbers), in 6 groups:
  Frames & tracks (13), Sashes & sash covers (10), Mullions/couplers/connectors (9), Glazing beads (6), Mesh (5), Door panels (1).
- `/products/upvc-profiles`: filter chips by group (also via `#frames`, `#beads` … links in the menu) and search.
- One page per profile: spec table (Material, Profile type, Width/depth, Wall thickness, Colour), use, group description,
  typical cross-section drawing, previous/next links, related profiles from the same group, product-specific WhatsApp enquiry.
- Data: `src/config/profiles.ts`. Values contradicting their own name on Fenstas were left out:
  2.5 Track (no width given), 82mm 2.5 Track Window (listed as 80mm), 90mm 2.5 Track (listed as 68mm),
  60 Out Swing Door Sash (listed as 60″), 20/150mm Door Panel (listed as 15mm).
  "90mm UPVC Windows Profile" (listed as a door profile) is shown as "90mm UPVC Frame Profile".
- Not shown until confirmed: brand (Fenstas lists "Fenstas"), photos, finished door products, "Fabrication".

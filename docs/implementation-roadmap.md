# Implementation Roadmap — NIMAX UPVC Website

Each phase ends with: what was done, deliverables, test results, issues, and a request for approval. Nothing proceeds without your OK.

| Phase | Scope | Main deliverables | Needs from you before it starts |
|---|---|---|---|
| **1. Reference audit** ✅ (this phase) | Crawl all 30 public pages; document structure, design, images, SEO | `docs/sitemap.md`, `page-inventory.md`, `design-audit.md`, `image-inventory.md`, `seo-plan.md`, this file | — |
| 2. Brand design system | Theme tokens (CSS variables), typography scale, logo/wordmark, reusable components | `src/config/theme.css`, `src/config/business.ts`, component library page | Approved sitemap; logo (or OK to design a wordmark); reference screenshots or browser OK (see design-audit limitation) |
| 3. Homepage | Full homepage per approved structure | Live preview URL, screenshots at 390/768/1440 px | Hero photo (or OK for temporary stock) |
| 4. Inner pages | About, Products hub, categories, approved product pages, Installation, Gallery, Contact, Privacy, 404 | All approved routes with metadata | Product confirmations; any About facts you want shown |
| 5. Photos & media | Image pipeline, optimisation, alt text, inventories | `image-inventory.md` v2, `missing-assets.md`, `asset-sources.md` | Your photos |
| 6. Contact & leads | Click-to-call ×2, WhatsApp ×2, Maps directions, enquiry form with validation + spam protection | Working form end-to-end | **Where enquiries should go** (see below) |
| 7. SEO | Metadata, sitemap.xml, robots.txt, JSON-LD, GA4 hook | `seo-audit.md`, `indexable-pages.md`, validation results | Domain; GA4 ID (optional) |
| 8. Performance & a11y | Lighthouse, Core Web Vitals, keyboard/contrast checks | Recorded scores (mobile + desktop) | — |
| 9. QA | Playwright tests across pages, links, forms, viewports | Test report + screenshots | — |
| 10. GitHub | Repo `nimax-upvc-website`, README, env docs | Repo URL | GitHub access (authorise when asked) |
| 11. Vercel | Production deploy on a `*.vercel.app` URL, verify everything live | Production URL | Approval to deploy; custom domain later |
| 12. Handover | Final checklist and guides | All 14 handover items | — |

## Tech stack (as specified)

Next.js (App Router) · TypeScript · Tailwind CSS · Lucide icons · GitHub · Vercel. Server Components by default; client components only for the mobile menu, gallery lightbox and enquiry form.

## Proposed project structure

```
nimax-upvc-website/
├── src/
│   ├── app/                    # routes (one folder per page in the approved sitemap)
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Home
│   │   ├── about/  products/  services/  gallery/  contact/  privacy/
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts  robots.ts
│   │   └── api/enquiry/route.ts
│   ├── components/             # Header, Nav, MobileNav, Footer, Button, ProductCard, ...
│   ├── config/
│   │   ├── business.ts         # name, address, phones, WhatsApp, map link — edit here only
│   │   ├── theme.css           # all colours as CSS variables — edit here only
│   │   └── products.ts         # confirmed products and their content
│   └── lib/                    # schema.org builders, analytics helper
├── public/images/  public/icons/  public/videos/
└── docs/
```

## Enquiry form: decision needed (Phase 6)

The form will never show "sent" unless delivery actually succeeded. Options:

| Option | How it works | Needs from you | Cost |
|---|---|---|---|
| A. Email via Resend | Server route emails each enquiry to you | An email address to receive enquiries; free Resend account + verified domain | Free tier |
| B. Database via Supabase | Enquiries saved to a table; you view them in Supabase | OK to create a Supabase project (your account is connected) | Free tier |
| C. A + B | Saved and emailed | Both | Free tier |
| D. WhatsApp only | Form pre-fills a WhatsApp message; customer taps Send | Nothing | Free |

Recommendation: **C** for reliability, with D as an extra button. An email address is required for A/C; none will be invented.

## Note on the earlier quick page

The single-page site published earlier in this conversation was a fast draft. It contains wording that is **not verified** under this brief's rules (a list of served neighbourhoods, "our workshop at Kittanahalli", "our own trained team", UPVC benefit claims such as energy saving). It will be replaced by the Phase 3–4 build and should not be published as-is.

## Risks and limitations

1. Reference colours, fonts and spacing could not be measured from this workspace (see `design-audit.md`). Screenshots or browser access will fix this.
2. Product list depends on your confirmation; until then every product page is provisional.
3. Image quality of the final site depends on real NIMAX photos; stock stand-ins will be clearly tracked.
4. Lighthouse 90+ is a target, not a guarantee; actual scores will be recorded.

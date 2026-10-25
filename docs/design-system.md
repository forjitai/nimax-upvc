# NIMAX UPVC Design System (Phase 2)

Live reference page: `/design-system` (not indexed by search engines).

## Where to change things

| To change | Edit this file | Effect |
|---|---|---|
| Colours | `src/config/theme.css` | Every page, button, menu and footer |
| Name, address, phone numbers, WhatsApp text, map links | `src/config/business.ts` | Header, footer, contact blocks, form, structured data |
| Products (names, descriptions, specs, photos) | `src/config/products.ts` | Menus, cards and (Phase 4) product pages |
| Menu items | `src/config/navigation.ts` | Desktop and mobile menus, footer |
| Logo | Replace files in `public/icons/` (keep the file names) | Header, footer, favicon |

## Colour tokens

| Token | Value | Use |
|---|---|---|
| `--nx-primary` | #173a4c | Brand colour, primary buttons, links |
| `--nx-primary-hover` | #0f2a38 | Hover on primary |
| `--nx-secondary` | #e6eef2 | Glass tint: badges, soft panels |
| `--nx-accent` | #c8892b | Brass: icons, highlights, buttons on dark. Not for body text on white |
| `--nx-bg` / `--nx-bg-alt` / `--nx-bg-dark` | #ffffff / #f4f7f8 / #10283a | Page, alternate section, dark band |
| `--nx-heading` / `--nx-body` / `--nx-muted` | #0f2230 / #3b4d58 / #66777f | Text |
| `--nx-nav-text` / `--nx-nav-hover` | #0f2230 / #173a4c | Navigation |
| `--nx-btn-*` | from primary/accent | Button colours |
| `--nx-whatsapp` | #1b8a4a | WhatsApp buttons (darker than brand green so white text is readable) |
| `--nx-border` / `--nx-border-strong` | #d9e2e6 / #b7c6cd | Lines, inputs |
| `--nx-footer-*` | #0b1e2a etc. | Footer |
| `--nx-error` | #b42318 | Form errors |

Contrast checked for: heading and body text on white and alt backgrounds, white text on primary, WhatsApp and dark band, dark text on accent buttons.

## Typography

| Role | Font | Class |
|---|---|---|
| Main heading (H1) | Archivo, expanded, 800 | `.nx-display` |
| Section heading (H2) | Archivo, 750 | `.nx-h2` |
| Product name / H3 | Archivo, 700 | `.nx-h3` |
| Eyebrow label | Manrope, 700, uppercase | `.nx-eyebrow` |
| Lead paragraph | Manrope, 18px | `.nx-lead` |
| Body | Manrope, 16px, 1.65 line height | default |
| Caption | Manrope, 14px, muted | `.nx-caption` |
| Navigation, buttons | Manrope, 600 | — |

Both fonts are self-hosted from `src/fonts/` (SIL Open Font License; licence files included). No request goes to Google Fonts.

## Logo

- `public/icons/logo-nimax-upvc.svg` — colour, for light backgrounds
- `public/icons/logo-nimax-upvc-white.svg` — for dark backgrounds
- `public/icons/logo-mark.svg` — square mark (favicon, social avatar)
- `src/app/icon.svg`, `src/app/favicon.ico`, `src/app/apple-icon.png`, `public/icons/icon-192.png`, `icon-512.png`

Concept: a window frame whose two glazing bars and brass diagonal form the letter N. Text is converted to outlines, so the logo looks identical everywhere.

## Components (`src/components/`)

| Component | Type | Notes |
|---|---|---|
| `Header` | Server | Contact strip (address, both numbers) + sticky bar |
| `DesktopNav` | Client | Products mega menu; hover, click and keyboard; Escape closes |
| `MobileNav` | Client | Drawer with product accordion, Call ×2 and WhatsApp buttons |
| `Footer` | Server | Links, products, address, both numbers with WhatsApp, directions |
| `Button`, `ButtonLink` | Server | primary, accent, outline, outline-light, whatsapp, ghost; sm/md/lg |
| `ProductCard`, `CategoryCard` | Server | Photo when supplied, otherwise product drawing |
| `ProductIllustration` | Server | 24 drawings of how each product opens |
| `ImageGallery` | Client | Filterable grid + lightbox (arrow keys, Escape) |
| `CtaSection`, `SectionHeading` | Server | — |
| `Breadcrumbs` | Server | Visible trail + BreadcrumbList JSON-LD |
| `ContactDetails` | Server | Both numbers (Call + WhatsApp each), address, directions |
| `EnquiryForm` | Client | Validation, honeypot, choice of number, hands off to WhatsApp |
| `Testimonials` | Server | Renders nothing unless genuine testimonials are supplied |
| `JsonLd` | Server | Safe structured-data output |

## Decisions made in Phase 2 (from owner answers)

- All products confirmed; each gets its own page (Phase 4).
- URL grouping refined from the Phase 1 draft so every product sits under a category:
  `/products/aluminium/aluminium-windows`, `/products/aluminium/aluminium-doors`,
  `/products/glass-systems/glass-partitions`, `/products/glass-systems/skylights`.
  Hinged, swing and fixed doors are combined in "Casement and Hinged Doors".
- No email address: the enquiry form hands the enquiry to WhatsApp. It never claims a message was sent.
- No photos yet: product drawings stand in. The gallery demo uses images labelled "SAMPLE PHOTO", which must not appear on the live gallery.
- No domain: canonical URLs use the Vercel production URL until `NEXT_PUBLIC_SITE_URL` is set.
- Service area: Bengaluru only (the business address).

## Scope change (24 Oct 2026, Phase 4)

Owner confirmed the business is **UPVC profiles and UPVC windows only**.
- Removed: UPVC doors (8 pages), aluminium windows and doors, glass partitions, skylights.
- Added: UPVC Profiles category with a "UPVC Window Profiles" page (general information only; no brand, sizes or colours until supplied).
- Installation page now covers UPVC windows only.
- Logo subline changed to "UPVC PROFILES & WINDOWS".
- Old URLs for removed products permanently redirect to `/products` (see `next.config.ts`).
- Site now has 20 indexable pages (see `/sitemap.xml`).

## Brand update (25 Oct 2026): client logo

- Logo: the client's NIMAX logo ("High Quality UPVC Profile"), original in `docs/nimax-logo-original.jpg`.
  Cleaned transparent versions: `public/icons/logo-nimax.png` (light backgrounds) and `logo-nimax-white.png` (blue "MA" turned white for dark backgrounds).
- Icons (favicon, app icon, Apple icon): the gold "NI" from the logo on a logo-blue square.
- Theme now from the logo: primary blue `#22247E`, gold `#B6890A`, dark bands `#14154F`, footer `#101144`,
  darker gold `#8A6700` for italic accent words on white (readable contrast).
- Header: blue contact strip with the tagline, white bar with the full logo, gold "Get a Quote" button, gold rule under the header, gold underline on menu hover.

# Google Search Console & Analytics — setup guide

Nothing here costs money. Do these after the site is live on its final address
(the Vercel address now, or your own domain later — repeat for a new domain).

## 1. Google Search Console (shows how Google sees the site)

1. Open https://search.google.com/search-console on the Google account that should own the site.
2. **Add property → URL prefix** → paste the full site address, e.g. `https://your-site.vercel.app/`.
3. Choose **HTML tag** verification. Google shows a tag like
   `<meta name="google-site-verification" content="ABC123..." />`. Copy only the `content` value.
4. In Vercel → project → **Settings → Environment Variables**, add
   `NEXT_PUBLIC_GSC_VERIFICATION` = `ABC123...` (Production), then **Redeploy**.
5. Back in Search Console, press **Verify**.
6. Left menu → **Sitemaps** → enter `sitemap.xml` → **Submit**.
7. Use **URL inspection** on the home page and one profile page → **Request indexing**.

Indexing usually starts within days but is never guaranteed; check **Pages** after a week.

## 2. Google Business Profile (most important for local searches)

1. https://business.google.com → add **NIMAX UPVC**.
2. Use exactly the same name, address and phone numbers as the website:
   - Kittanahalli, Kadabagere Road, Byandahalli, Bengaluru, Karnataka 562130
   - +91 91138 08442, +91 79751 77812
3. Category: e.g. *Window supplier* (add *UPVC window manufacturer* / *Building materials supplier* if listed).
4. Add the website address, opening hours and photos. Google will verify by post, phone or video.
5. Ask genuine customers to leave Google reviews. Never write reviews yourself.

## 3. Google Analytics 4 (optional)

1. https://analytics.google.com → **Admin → Create property** → Web → enter the site address.
2. Copy the **Measurement ID** (`G-XXXXXXXXXX`).
3. In Vercel add `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX` (Production) → **Redeploy**.
4. The site then records page views and these events: `click_call`, `click_whatsapp`, `click_directions`.
   The Privacy Policy page updates itself to mention Analytics automatically.

Leave `NEXT_PUBLIC_GA_ID` empty and nothing is loaded.

## 4. Own domain (later)

1. Buy a domain (e.g. nimaxupvc.com / .in).
2. Vercel → project → **Settings → Domains** → add it and follow the DNS steps.
3. Add `NEXT_PUBLIC_SITE_URL` = `https://www.your-domain.com` → **Redeploy**
   (this updates canonical links, the sitemap and share links).
4. Add the new domain as a new Search Console property and submit the sitemap again.

## 5. Clean up the old Fenstas website

The fenstas.com blog contains ~70 spam posts (casino, betting, APK downloads) and a hidden casino link
on its home page, which suggests the WordPress site has been hacked. Ask whoever manages it to:
update WordPress, themes and plugins; change all admin passwords; remove unknown admin users and the
spam posts; and run a security scan (e.g. Wordfence). If NIMAX replaces Fenstas, redirect the Fenstas
pages to this site rather than leaving the hacked site online.

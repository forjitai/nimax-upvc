"""Phase 3 homepage checks. Usage: python3 tests/phase3_home_check.py BASE_URL OUT_DIR"""
import sys, json
from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3100"
OUT = sys.argv[2] if len(sys.argv) > 2 else "screenshots"
results = []
def check(name, ok, detail=""): results.append({"test": name, "pass": bool(ok), "detail": detail})

with sync_playwright() as p:
    b = p.chromium.launch()
    for vw, vh, tag in [(390, 844, "phone"), (768, 1024, "tablet"), (1440, 900, "desktop")]:
        ctx = b.new_context(viewport={"width": vw, "height": vh}, device_scale_factor=2 if vw < 800 else 1)
        page = ctx.new_page()
        errors = []
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(BASE + "/", wait_until="networkidle")
        page.wait_for_timeout(2300)  # let hero animation finish
        sw = page.evaluate("document.documentElement.scrollWidth")
        check(f"{tag} no horizontal overflow", sw <= vw, f"scrollWidth={sw}")
        broken = page.evaluate("[...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src)")
        check(f"{tag} no broken images", not broken, json.dumps(broken))
        real = [e for e in errors if "404" not in e]
        check(f"{tag} no console errors (excl. not-yet-built pages)", not real, json.dumps(real[:3]))
        page.screenshot(path=f"{OUT}/home-{tag}-top.png")
        page.screenshot(path=f"{OUT}/home-{tag}-full.png", full_page=True)
        ctx.close()

    ctx = b.new_context(viewport={"width": 1280, "height": 900})
    page = ctx.new_page()
    page.goto(BASE + "/", wait_until="networkidle")
    h1 = page.locator("h1").count()
    check("exactly one H1", h1 == 1, str(h1))
    levels = page.evaluate("[...document.querySelectorAll('main h1, main h2, main h3')].map(h => +h.tagName[1])")
    jumps = [f"{a}->{b_}" for a, b_ in zip(levels, levels[1:]) if b_ - a > 1]
    check("no skipped heading levels", not jumps, ",".join(jumps))
    title = page.title()
    check("title mentions UPVC + Bengaluru + brand", all(k in title for k in ["UPVC", "Bengaluru", "NIMAX UPVC"]), title)
    desc = page.get_attribute("meta[name=description]", "content") or ""
    check("meta description 70-170 chars", 70 <= len(desc) <= 170, f"{len(desc)}: {desc}")
    canon = page.get_attribute("link[rel=canonical]", "href")
    check("canonical present", bool(canon), str(canon))
    og = page.get_attribute("meta[property='og:title']", "content")
    check("Open Graph title present", bool(og), str(og))
    robots = page.get_attribute("meta[name=robots]", "content") or ""
    check("homepage indexable", "noindex" not in robots, robots)
    tel = page.eval_on_selector_all("a[href^='tel:']", "els => [...new Set(els.map(e => e.getAttribute('href')))]")
    check("call links for both numbers", set(tel) == {"tel:+919113808442", "tel:+917975177812"}, json.dumps(tel))
    wa = page.eval_on_selector_all("a[href^='https://wa.me/']", "els => [...new Set(els.map(e => e.getAttribute('href').split('?')[0]))]")
    check("WhatsApp links for both numbers", set(wa) == {"https://wa.me/919113808442", "https://wa.me/917975177812"}, json.dumps(wa))
    ld = page.eval_on_selector_all("script[type='application/ld+json']", "els => els.map(e => JSON.parse(e.textContent))")
    types = []
    for d in ld:
        types += [g["@type"] for g in d.get("@graph", [])] if "@graph" in d else [d["@type"]]
    check("JSON-LD: Organization, WebSite, HomeAndConstructionBusiness", {"Organization", "WebSite", "HomeAndConstructionBusiness"} <= set(types), json.dumps(types))
    biz = next(g for d in ld for g in d.get("@graph", []) if g["@type"] == "HomeAndConstructionBusiness")
    check("structured data has no invented fields", not any(k in biz for k in ["openingHours", "aggregateRating", "review", "geo", "foundingDate", "email"]), json.dumps(list(biz)))
    links = page.eval_on_selector_all("main a[href^='/']", "els => [...new Set(els.map(e => e.getAttribute('href')))]")
    check("internal links collected", len(links) > 10, f"{len(links)} links")
    no_alt = page.evaluate("[...document.images].filter(i => !i.hasAttribute('alt')).length")
    check("all images have alt", no_alt == 0, str(no_alt))
    unlabeled = page.evaluate("[...document.querySelectorAll('a,button')].filter(e => !(e.innerText.trim() || e.getAttribute('aria-label') || e.querySelector('.sr-only'))).map(e => e.outerHTML.slice(0,80))")
    check("all links/buttons have accessible names", not unlabeled, json.dumps(unlabeled[:3]))
    json.dump(links, open(f"{OUT}/home-internal-links.json", "w"), indent=1)
    ctx.close()
    b.close()

for r in results:
    print(("PASS " if r["pass"] else "FAIL ") + r["test"] + ("" if r["pass"] else f"  -> {r['detail']}"))
print(f"\n{sum(r['pass'] for r in results)}/{len(results)} passed")
json.dump(results, open(f"{OUT}/home-results.json", "w"), indent=1)

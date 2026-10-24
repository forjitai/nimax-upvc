"""Phase 2 browser checks: overflow, console errors, menus, form validation, lightbox. Saves screenshots."""
import sys, json
from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3100"
OUT = sys.argv[2] if len(sys.argv) > 2 else "screenshots"
results = []

def check(name, ok, detail=""):
    results.append({"test": name, "pass": bool(ok), "detail": detail})

with sync_playwright() as p:
    b = p.chromium.launch()
    for vw, vh, tag in [(390, 844, "phone"), (768, 1024, "tablet"), (1440, 900, "desktop")]:
        ctx = b.new_context(viewport={"width": vw, "height": vh}, device_scale_factor=2 if vw < 800 else 1)
        page = ctx.new_page()
        errors = []
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append(str(e)))
        for path, name in [("/", "home"), ("/design-system", "design-system")]:
            page.goto(BASE + path, wait_until="networkidle")
            sw = page.evaluate("document.documentElement.scrollWidth")
            check(f"{tag} {path} no horizontal overflow", sw <= vw, f"scrollWidth={sw}")
            broken = page.evaluate("[...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src)")
            check(f"{tag} {path} no broken images", not broken, json.dumps(broken))
            page.screenshot(path=f"{OUT}/{tag}-{name}-top.png")
            if name == "design-system":
                page.screenshot(path=f"{OUT}/{tag}-{name}-full.png", full_page=True)
        # Links to pages built in Phase 4 (e.g. /contact) 404 when prefetched; ignore only those
        real = [e for e in errors if "404" not in e]
        check(f"{tag} no console errors (excluding not-yet-built pages)", not real, json.dumps(real[:3]))

        page.goto(BASE + "/", wait_until="networkidle")
        if vw < 1024:
            page.click("button[aria-controls=mobile-menu]")
            page.wait_for_timeout(200)
            check(f"{tag} mobile menu opens", page.is_visible("#mobile-menu"))
            page.click("#mobile-menu button[aria-expanded=false] >> nth=0")
            page.wait_for_timeout(150)
            page.screenshot(path=f"{OUT}/{tag}-mobile-menu.png")
            page.keyboard.press("Escape")
            page.wait_for_timeout(150)
            check(f"{tag} mobile menu closes on Escape", not page.is_visible("#mobile-menu"))
        else:
            page.hover("button[aria-controls=products-menu]")
            page.wait_for_timeout(200)
            check(f"{tag} products mega menu opens on hover", page.is_visible("#products-menu"))
            page.screenshot(path=f"{OUT}/{tag}-mega-menu.png")
            page.keyboard.press("Escape")
        ctx.close()

    # Functional checks at desktop
    ctx = b.new_context(viewport={"width": 1280, "height": 900})
    page = ctx.new_page()
    page.goto(BASE + "/design-system", wait_until="networkidle")
    tel = page.eval_on_selector_all("a[href^='tel:']", "els => [...new Set(els.map(e => e.getAttribute('href')))]")
    check("tel links for both numbers", set(tel) == {"tel:+919113808442", "tel:+917975177812"}, json.dumps(tel))
    wa = page.eval_on_selector_all("a[href^='https://wa.me/']", "els => [...new Set(els.map(e => e.getAttribute('href').split('?')[0]))]")
    check("WhatsApp links for both numbers", set(wa) == {"https://wa.me/919113808442", "https://wa.me/917975177812"}, json.dumps(wa))
    maps = page.eval_on_selector_all("a[href*='google.com/maps']", "els => [...new Set(els.map(e => e.getAttribute('href')))]")
    check("Maps directions link present", any("/maps/dir/" in m for m in maps), json.dumps(maps))

    # Form: empty submit shows errors, no popup
    page.click("form button[type=submit]")
    check("form blocks empty submit", page.locator("text=Please enter your name.").count() == 1)
    page.fill("input[name=name]", "Test Customer")
    page.fill("input[name=phone]", "12345")
    page.click("form button[type=submit]")
    check("form rejects invalid phone", page.locator("text=Please enter a 10-digit Indian mobile number.").count() == 1)
    page.fill("input[name=phone]", "9876543210")
    page.select_option("select[name=product]", label="UPVC Sliding Windows")
    opened = []
    ctx.on("request", lambda r: opened.append(r.url) if "wa.me" in r.url else None)
    with ctx.expect_page():
        page.click("form button[type=submit]")
    page.wait_for_timeout(300)
    url = opened[0] if opened else ""
    from urllib.parse import unquote
    check("WhatsApp message contains form details", "Test Customer" in unquote(url) and "UPVC Sliding Windows" in unquote(url), unquote(url)[:160])
    check("form opens WhatsApp with message", "wa.me/919113808442" in url or "api.whatsapp.com" in url or "whatsapp" in url, url[:120])
    check("form shows honest status (not 'sent')", page.locator("text=Press Send").count() >= 1 or page.locator("text=press Send").count() >= 1)

    # Lightbox
    page.click("ul >> button:has-text('Sample 1')")
    page.wait_for_timeout(200)
    check("lightbox opens", page.is_visible("dialog[open]"))
    page.keyboard.press("ArrowRight")
    page.wait_for_timeout(100)
    check("lightbox arrow key moves", page.locator("dialog[open] >> text=2 / 6").count() == 1)
    page.keyboard.press("Escape")
    page.wait_for_timeout(100)
    check("lightbox closes on Escape", page.locator("dialog[open]").count() == 0)

    # JSON-LD parses
    ld = page.eval_on_selector_all("script[type='application/ld+json']", "els => els.map(e => { try { return JSON.parse(e.textContent)['@type'] } catch { return 'INVALID' } })")
    check("JSON-LD valid (Organization, BreadcrumbList)", "INVALID" not in ld and "Organization" in ld and "BreadcrumbList" in ld, json.dumps(ld))
    robots = page.get_attribute("meta[name=robots]", "content")
    check("design-system page is noindex", robots and "noindex" in robots, str(robots))

    # Keyboard: skip link
    page.goto(BASE + "/", wait_until="networkidle")
    page.keyboard.press("Tab")
    focused = page.evaluate("document.activeElement.textContent.trim()")
    check("first Tab focuses skip link", focused == "Skip to content", focused)
    ctx.close()
    b.close()

passed = sum(r["pass"] for r in results)
for r in results:
    print(("PASS " if r["pass"] else "FAIL ") + r["test"] + ("" if r["pass"] else f"  -> {r['detail']}"))
print(f"\n{passed}/{len(results)} passed")
json.dump(results, open(f"{OUT}/results.json", "w"), indent=1)

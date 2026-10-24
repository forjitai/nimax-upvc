"""Whole-site crawl: every page from the sitemap plus every internal link found.
Checks status, single H1, unique title/description, canonical, overflow at phone and desktop,
console errors, broken images, heading order. Usage: python3 tests/site_check.py BASE OUT"""
import sys, json, re
from urllib.parse import urljoin, urlparse
from playwright.sync_api import sync_playwright

BASE = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else "http://localhost:3100"
OUT = sys.argv[2] if len(sys.argv) > 2 else "screenshots"
results, pages = [], {}
def check(name, ok, detail=""): results.append({"test": name, "pass": bool(ok), "detail": detail})

with sync_playwright() as p:
    b = p.chromium.launch()
    req = p.request.new_context()
    sm = req.get(BASE + "/sitemap.xml").text()
    locs = [urlparse(u).path or "/" for u in re.findall(r"<loc>(.*?)</loc>", sm)]
    queue = list(dict.fromkeys(locs + ["/gallery", "/design-system"]))
    seen = set()
    for vw, tag in [(390, "phone"), (1366, "desktop")]:
        ctx = b.new_context(viewport={"width": vw, "height": 900})
        page = ctx.new_page()
        errs = []
        page.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: errs.append(str(e)))
        todo = list(queue)
        while todo:
            path = todo.pop(0)
            if (tag, path) in seen: continue
            seen.add((tag, path))
            errs.clear()
            r = page.goto(BASE + path, wait_until="networkidle")
            status = r.status if r else 0
            info = pages.setdefault(path, {})
            info["status"] = status
            sw = page.evaluate("document.documentElement.scrollWidth")
            if sw > vw: check(f"{tag} {path} no horizontal overflow", False, f"scrollWidth={sw}")
            broken = page.evaluate("[...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src)")
            if broken: check(f"{tag} {path} images", False, json.dumps(broken))
            if errs: check(f"{tag} {path} console", False, json.dumps(errs[:2]))
            if tag == "desktop":
                info.update(page.evaluate("""() => ({
                  title: document.title,
                  desc: document.querySelector('meta[name=description]')?.content || '',
                  canonical: document.querySelector('link[rel=canonical]')?.href || '',
                  robots: document.querySelector('meta[name=robots]')?.content || '',
                  h1: document.querySelectorAll('h1').length,
                  levels: [...document.querySelectorAll('main h1, main h2, main h3, main h4')].map(h => +h.tagName[1]),
                  noAlt: [...document.images].filter(i => !i.hasAttribute('alt')).length,
                })"""))
                links = page.eval_on_selector_all("a[href^='/']", "els => els.map(e => e.getAttribute('href'))")
                for l in links:
                    lp = urlparse(l).path or "/"
                    if lp not in pages and lp not in todo and not lp.startswith("/_next"):
                        todo.append(lp); queue.append(lp)
        ctx.close()
    b.close()

check("pages crawled", len(pages) >= 35, str(len(pages)))
bad = {k: v["status"] for k, v in pages.items() if v["status"] != 200}
check("every linked page returns 200", not bad, json.dumps(bad))
indexable = {k: v for k, v in pages.items() if v.get("status") == 200 and "noindex" not in v.get("robots", "")}
check("exactly one H1 on every page", all(v.get("h1") == 1 for v in pages.values() if v.get("status") == 200),
      json.dumps({k: v.get("h1") for k, v in pages.items() if v.get("h1") != 1}))
jumps = {k: [f"{a}->{c}" for a, c in zip(v["levels"], v["levels"][1:]) if c - a > 1] for k, v in pages.items() if v.get("levels")}
jumps = {k: j for k, j in jumps.items() if j}
check("no skipped heading levels", not jumps, json.dumps(jumps))
titles = [v["title"] for v in indexable.values()]
dup_t = {t for t in titles if titles.count(t) > 1}
check("unique titles on indexable pages", not dup_t, json.dumps(list(dup_t)))
long_t = {k: len(v["title"]) for k, v in indexable.items() if len(v["title"]) > 65}
check("titles <= 65 chars", not long_t, json.dumps(long_t))
descs = [v["desc"] for v in indexable.values()]
dup_d = {d for d in descs if descs.count(d) > 1}
check("unique meta descriptions", not dup_d, json.dumps(list(dup_d))[:300])
bad_d = {k: len(v["desc"]) for k, v in indexable.items() if not 70 <= len(v["desc"]) <= 165}
check("descriptions 70-165 chars", not bad_d, json.dumps(bad_d))
no_canon = [k for k, v in indexable.items() if not v.get("canonical")]
check("canonical on every indexable page", not no_canon, json.dumps(no_canon))
wrong_canon = {k: v["canonical"] for k, v in indexable.items() if v.get("canonical") and urlparse(v["canonical"]).path.rstrip("/") != k.rstrip("/")}
check("canonical points to itself", not wrong_canon, json.dumps(wrong_canon))
alt = {k: v["noAlt"] for k, v in pages.items() if v.get("noAlt")}
check("all images have alt", not alt, json.dumps(alt))

for r in results:
    print(("PASS " if r["pass"] else "FAIL ") + r["test"] + ("" if r["pass"] else f"  -> {r['detail'][:400]}"))
print(f"\n{sum(r['pass'] for r in results)}/{len(results)} passed · {len(pages)} pages")
json.dump({"results": results, "pages": pages}, open(f"{OUT}/site-results.json", "w"), indent=1)

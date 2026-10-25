"""Parse every JSON-LD block on every sitemap page; report types and any invalid JSON or missing required fields."""
import sys, json, re, urllib.request
BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3100"
sm = urllib.request.urlopen(BASE + "/sitemap.xml").read().decode()
paths = [re.sub(r"^https?://[^/]+", "", u) or "/" for u in re.findall(r"<loc>(.*?)</loc>", sm)]
counts, problems = {}, []
REQ = {"BreadcrumbList": ["itemListElement"], "FAQPage": ["mainEntity"], "Article": ["headline", "datePublished", "author"],
       "Organization": ["name", "url"], "HomeAndConstructionBusiness": ["name", "address", "telephone"], "ItemList": ["itemListElement"], "WebSite": ["name", "url"]}
for p in paths:
    html = urllib.request.urlopen(BASE + p).read().decode()
    for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S):
        try: d = json.loads(block)
        except Exception as e: problems.append(f"{p}: invalid JSON {e}"); continue
        for node in d.get("@graph", [d]):
            t = node.get("@type"); counts[t] = counts.get(t, 0) + 1
            for k in REQ.get(t, []):
                if not node.get(k): problems.append(f"{p}: {t} missing {k}")
print(f"{len(paths)} pages checked"); print(json.dumps(counts, indent=1))
print("PROBLEMS:" if problems else "No problems found"); [print(" ", x) for x in problems[:20]]

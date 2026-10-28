import re, json, sys
sys.path.insert(0, ".")
from shapes import build, to_job
src = open("/home/claude/nimax-upvc-website/src/config/profiles.ts").read()
jobs = []
for m in re.finditer(r'P\("([^"]+)", "[^"]+", "\w+", "([^"]+)", (undefined|"[^"]*"), (undefined|"[^"]*")', src):
    slug, ptype, w, t = m.groups()
    w = None if w == "undefined" else w.strip('"'); t = None if t == "undefined" else t.strip('"')
    g = build(slug, ptype, w, t)
    nparts = 1 if g.geom_type == "Polygon" else len(g.geoms)
    if nparts > 1: print("multipart", slug, nparts)
    jobs.append(to_job(g, f"out/{slug}.png"))
json.dump(jobs, open("jobs.json", "w")); print(len(jobs), "jobs")

"""Transparent-background scene renders for the homepage and section headers."""
import json, sys
sys.path.insert(0, ".")
from shapes import build, to_job
P = {}
import re
src = open("../../src/config/profiles.ts").read()
for m in re.finditer(r'P\("([^"]+)", "[^"]+", "\w+", "([^"]+)", (undefined|"[^"]*"), (undefined|"[^"]*")', src):
    s, t, w, th = m.groups(); P[s] = (s, t, None if w == "undefined" else w.strip('"'), None if th == "undefined" else th.strip('"'))
cluster, x = [], 0
for slug, z, depth in [("112mm-3-track", 0, 300), ("57mm-sliding-sash", 50, 260), ("60mm-casement", -20, 280), ("t-mullion", 40, 240), ("5mm-sliding-bead", 70, 200)]:
    g = build(*P[slug]); minx, _, maxx, _ = g.bounds; w = maxx - minx
    j = to_job(g, ""); j.pop("out"); j.update(x=x + w / 2, z=z, depth=depth); cluster.append(j); x += w + 22
profile_jobs = [{"items": cluster, "transparent": True, "cam": [0.45, 0.62, 1.0], "out": "scenes/profiles-group.png"}]
window_jobs = [
    {"type": "installed-sliding", "cam": [0.3, 0.12, 1], "transparent": True, "out": "scenes/hero-sliding.png"},
    {"type": "installed-casement", "cam": [-0.45, 0.12, 1], "transparent": True, "out": "scenes/installed-casement.png"},
    {"type": "combination", "transparent": True, "out": "scenes/combination.png"},
    {"type": "sliding", "transparent": True, "out": "scenes/sliding.png"},
    {"type": "casement", "transparent": True, "out": "scenes/casement.png"},
    {"type": "tilt-and-turn", "transparent": True, "cam": [0.5, 0.12, 1], "out": "scenes/tilt-and-turn.png"},
]
json.dump(profile_jobs, open("scene_profiles.json", "w")); json.dump(window_jobs, open("scene_windows.json", "w"))

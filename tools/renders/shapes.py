"""Typical UPVC profile cross-sections (mm), built from rectangles with shapely.
These are generic shapes per profile TYPE, for illustration only."""
import json
from shapely.geometry import box, Point, Polygon
from shapely.ops import unary_union
from shapely import affinity


def R(x, y, w, h):
    return box(x, y, x + w, y + h)


def chambers(x, y, w, h, n, t):
    """n hollow chambers inside the box (x,y,w,h) with wall t."""
    cw = (w - t * (n + 1)) / n
    return [R(x + t + i * (cw + t), y + t, cw, h - 2 * t) for i in range(n)]


def rail(x, y, h, t=2.4, cap=5.5):
    return unary_union([R(x, y, t, h), R(x - (cap - t) / 2, y + h - 2.2, cap, 2.2)])


def track_frame(width, tracks, t):
    base_h = 22
    n_ch = max(2, round(width / 26))
    parts = [R(0, 0, width, base_h), R(-6, 0, 6, 2.4), R(width, 0, 6, 2.4)]
    full = int(tracks)
    slots = full + (1 if tracks % 1 else 0) + 1
    xs = [width * (i + 1) / slots for i in range(slots - 1)]
    for i, x in enumerate(xs):
        h = 14 if (tracks % 1 and i == len(xs) - 1) else 22
        parts.append(rail(x - 1.2, base_h, h))
    shape = unary_union(parts)
    return shape.difference(unary_union(chambers(0, 0, width, base_h, n_ch, t)))


def casement_frame(width, t, height=48):
    body = R(0, 0, width, height * 0.62)
    step = R(0, height * 0.62, width * 0.45, height * 0.38)
    lip = R(width * 0.45, height * 0.62, 2.5, 6)
    fl = R(-6, 0, 6, 2.4)
    shape = unary_union([body, step, lip, fl])
    holes = chambers(0, 0, width, height * 0.62, max(2, round(width / 22)), t)
    holes.append(R(t, height * 0.62, width * 0.45 - 2 * t, height * 0.38 - t))
    return shape.difference(unary_union(holes))


def blend_lower(width, t):
    base = R(0, 0, width, 9)
    lips = [R(0, 9, 3, 7), R(width - 3, 9, 3, 7), R(width / 2 - 1.5, 9, 3, 10)]
    return unary_union([base] + lips).difference(unary_union(chambers(0, 0, width, 9, 3, t * 0.8)))


def sliding_sash(width, t, h=46):
    body = R(0, 0, width, h)
    glass_ch = [R(width * 0.3, h, 3, 9), R(width * 0.7 - 3, h, 3, 9)]
    groove = R(width * 0.4, 0, width * 0.2, 5)
    shape = unary_union([body] + glass_ch).difference(groove)
    holes = [R(t, 5 + t, width / 2 - 1.5 * t, h - 5 - 2 * t), R(width / 2 + t / 2, 5 + t, width / 2 - 1.5 * t, h - 5 - 2 * t)]
    return shape.difference(unary_union(holes))


def outswing_sash(width, t, h=52):
    body = R(0, 0, width, h * 0.6)
    top = R(width * 0.35, h * 0.6, width * 0.65, h * 0.4)
    lip = R(width * 0.35 - 2.5, h * 0.6, 2.5, 7)
    shape = unary_union([body, top, lip])
    holes = chambers(0, 0, width, h * 0.6, 3, t) + [R(width * 0.35 + t, h * 0.6, width * 0.65 - 2 * t, h * 0.4 - t)]
    return shape.difference(unary_union(holes))


def sash_cover(width, t):
    plate = R(0, 0, width, 4)
    hooks = [R(0, 4, 2.5, 9), R(-3, 11, 5.5, 2.2), R(width - 2.5, 4, 2.5, 9), R(width - 2.5, 11, 5.5, 2.2)]
    mid = [R(width * 0.33, 4, 2, 6), R(width * 0.66, 4, 2, 6)]
    return unary_union([plate] + hooks + mid)


def mullion(width, t, h=56):
    core = R(width * 0.2, 0, width * 0.6, h)
    flanges = [R(0, h - 4, width, 4), R(0, 0, width, 4)]
    shape = unary_union([core] + flanges)
    return shape.difference(unary_union(chambers(width * 0.2, 0, width * 0.6, h, 2, t)))


def t_mullion(width, t, h=60):
    stem = R(width * 0.25, 0, width * 0.5, h * 0.72)
    bar = R(0, h * 0.72, width, h * 0.28)
    shape = unary_union([stem, bar])
    holes = [R(width * 0.25 + t, t, width * 0.5 - 2 * t, h * 0.72 - t)] + chambers(0, h * 0.72, width, h * 0.28, 3, t)
    return shape.difference(unary_union(holes))


def coupler(width, t, h=28):
    plates = [R(0, 0, width, t + 1), R(0, h - t - 1, width, t + 1)]
    webs = [R(width * 0.25, 0, t + 1, h), R(width * 0.75 - t, 0, t + 1, h)]
    keys = [R(-2, h - 4, 2, 4), R(width, h - 4, 2, 4), R(-2, 0, 2, 4), R(width, 0, 2, 4)]
    return unary_union(plates + webs + keys)


def connector(width, t, h=22):
    plate = R(0, 0, width, 4)
    hooks = [R(width * 0.15, 4, 3, h - 4), R(width * 0.15, h - 3, 9, 3), R(width * 0.85 - 3, 4, 3, h - 4), R(width * 0.85 - 9, h - 3, 9, 3)]
    return unary_union([plate] + hooks)


def bay_pole(d, t):
    ring = Point(0, 0).buffer(d / 2, 48).difference(Point(0, 0).buffer(d / 2 - t * 1.6, 48))
    fins = [affinity.rotate(R(d / 2 - 2, -4, 14, 8), a, origin=(0, 0)) for a in (20, 160)]
    fins_cut = [affinity.rotate(R(d / 2 - 2, -4 + t, 14 - t, 8 - 2 * t), a, origin=(0, 0)) for a in (20, 160)]
    return unary_union([ring] + fins).difference(unary_union(fins_cut)).union(ring)


def bay_corner(w1, w2, t, h=30):
    l1, l2 = w1 * 0.6, w2 * 0.6
    a = R(0, 0, l1, h)
    b = affinity.rotate(R(-l2, 0, l2, h), -45, origin=(0, 0))
    joint = Point(0, h / 2).buffer(h / 2 + 1, 4)
    shape = unary_union([a, b, joint])
    ha = R(h / 2 + t, t, l1 - h / 2 - 2 * t, h - 2 * t)
    hb = affinity.rotate(R(-l2 + t, t, l2 - h / 2 - 2 * t, h - 2 * t), -45, origin=(0, 0))
    return shape.difference(unary_union([ha, hb]))


def tube_adaptor(t):
    outer = Point(0, 0).buffer(16, 48)
    inner = Point(0, 0).buffer(16 - t * 2, 48)
    keys = [affinity.rotate(R(14, -3, 7, 6), a, origin=(0, 0)) for a in (0, 90, 180, 270)]
    return unary_union([outer.difference(inner)] + keys)


def bead(w, h, t, kind="square"):
    if kind == "round":
        q = Point(0, 0).buffer(h, 48).intersection(R(0, 0, h, h))
        return unary_union([q, R(0, -6, 2.5, 6), R(-1, -7, 4.5, 2)]).difference(Point(0, 0).buffer(h - t * 1.6, 48).intersection(R(t, t, h, h)))
    body = Polygon([(0, 0), (w, 0), (w, h * 0.55), (w * 0.35, h), (0, h)])
    leg = [R(1, -6, 2.5, 6), R(0, -7.5, 4.5, 2)]
    lip = R(w - 2, -3, 2, 3)
    shape = unary_union([body] + leg + [lip])
    inner = Polygon([(t, t), (w - t, t), (w - t, h * 0.55 - t * 0.6), (w * 0.35 + t * 0.3, h - t), (t, h - t)])
    if kind == "drain":
        shape = shape.difference(R(w * 0.45, 0, 2.5, t))
    return shape.difference(inner)


def mesh_frame(width, t, h=24):
    body = R(0, 0, width, h)
    groove = R(width * 0.45, h - 5, 4, 5)
    lip = R(-4, h - 3, 4, 3)
    shape = unary_union([body, lip]).difference(groove)
    return shape.difference(unary_union(chambers(0, 0, width, h - 5, 2, t)))


def mesh_track(width, t):
    base = R(0, 0, width, 8)
    return unary_union([base, rail(width * 0.5 - 1.2, 8, 14), R(0, 8, 2.5, 5), R(width - 2.5, 8, 2.5, 5)]).difference(
        unary_union(chambers(0, 0, width, 8, 2, t * 0.8)))


def add_track(t):
    base = R(0, 0, 30, 5)
    return unary_union([base, rail(14, 5, 14), R(0, -5, 2.5, 5), R(27.5, -5, 2.5, 5)])


def door_panel(t):
    w, h = 150, 20
    body = R(0, 0, w, h)
    tongue = R(w, h / 2 - 3, 6, 6)
    groove = R(0, h / 2 - 3.5, 6, 7)
    shape = unary_union([body, tongue]).difference(groove)
    holes = [R(6 + t + i * 12, t, 12 - t, h - 2 * t) for i in range(11)]
    return shape.difference(unary_union(holes))


def mm(s, default):
    try:
        return float(s.split()[0].split("/")[0])
    except Exception:
        return default


def build(slug, ptype, width, thick):
    t = mm(thick or "2", 2)
    w = mm(width or "", 0)
    s = slug
    if "door-panel" in s: return door_panel(t)
    if s == "mesh-add-track": return add_track(t)
    if s == "mesh-window-track": return mesh_track(w or 67, t)
    if s == "mesh-mullion": return mullion(34, t, 40)
    if "mesh" in s: return mesh_frame(w or 52, t)
    if s == "round-bead": return bead(18, 18, t, "round")
    if "hole" in s: return bead(22, 22, t, "drain")
    if "bead" in s: return bead(26 if "90" in s else 22, 24 if "casement" in s else 20, t)
    if s == "tube-adaptor": return tube_adaptor(t)
    if "bay-corner" in s: return bay_corner(80, 60, t)
    if "bay-pole" in s: return bay_pole(w or 60, t)
    if "connector" in s: return connector(w or 88, t)
    if "coupler" in s: return coupler(w or 60, t)
    if s == "t-mullion": return t_mullion(w or 60, t)
    if "mullion" in s: return mullion(w or 65, t)
    if "cover" in s: return sash_cover(w or 88, t)
    if "out-swing" in s: return outswing_sash(w or 60, t)
    if "sash" in s: return sliding_sash(w or 57, t)
    if "blend" in s: return blend_lower(w or 60, t)
    if "3-track" in s: return track_frame(w or 112, 3, t)
    if "2-5-track" in s: return track_frame(w or 82, 2.5, t)
    if "track" in s: return track_frame(w or 62, 2, t)
    if "sliding" in s: return track_frame(w or 55, 2, t)
    if "casement" in s: return casement_frame(w or 60, t)
    if "frame" in s: return casement_frame(w or 90, t, 58)
    raise ValueError(s)


def to_job(geom, out):
    geom = geom.buffer(0)
    if geom.geom_type == "MultiPolygon":
        geom = max(geom.geoms, key=lambda g: g.area)
    geom = geom.simplify(0.05)
    minx, miny, maxx, maxy = geom.bounds
    size = max(maxx - minx, maxy - miny)
    return {
        "outline": [[x, y] for x, y in list(geom.exterior.coords)[:-1]],
        "holes": [[[x, y] for x, y in list(i.coords)[:-1]] for i in geom.interiors],
        "depth": max(110, size * 2.2), "out": out,
    }

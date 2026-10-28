# 3D illustrations

Generates the "3D illustration" images in `public/images/renders/` (shown until real photos are added).
Shapes are *typical* cross-sections per profile type, not exact NIMAX dies.

```bash
cd tools/renders && npm install && pip install shapely playwright pillow
python3 make_jobs.py                     # profile shapes from src/config/profiles.ts -> jobs.json
mkdir -p out wout
python3 shot.py jobs.json profile.html   # 44 profiles -> out/*.png
python3 shot.py wjobs.json window.html   # 11 windows  -> wout/*.png
# then convert to 1000px WebP into public/images/renders/<slug>.webp
```
- Profile shapes: `shapes.py` (`build()` picks a shape from the slug).
- Window styles: `builders` in `window.html`.

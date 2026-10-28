import sys, json, base64, http.server, threading, functools
from playwright.sync_api import sync_playwright
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=".")
http.server.SimpleHTTPRequestHandler.log_message = lambda *a: None
srv = http.server.ThreadingHTTPServer(("127.0.0.1", 8765), H); threading.Thread(target=srv.serve_forever, daemon=True).start()
jobs = json.load(open(sys.argv[1]))
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
    pg = b.new_page(viewport={"width": 1200, "height": 1200}); pg.on("console", lambda m: print("console:", m.text))
    pg.goto("http://127.0.0.1:8765/" + (sys.argv[2] if len(sys.argv) > 2 else "profile.html")); pg.wait_for_function("window.ready")
    for j in jobs:
        url = pg.evaluate("j => (j.type ? renderWindow(j) : renderProfile(j))", j)
        open(j["out"], "wb").write(base64.b64decode(url.split(",")[1])); print("wrote", j["out"])
    b.close()
srv.shutdown()

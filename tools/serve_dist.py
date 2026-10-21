"""Serve dist/ on 127.0.0.1:4173 the way Caddy serves it in production: a
path no file answers gets the app shell, so the app's own URLs
(/t/python/stats) load on a reload instead of 404ing."""

import http.server
import os
import sys

ROOT = sys.argv[1] if len(sys.argv) > 1 else "dist"
PORT = 4173


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def send_head(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path) and not os.path.exists(path + ".html"):
            self.path = "/index.html"
        elif not os.path.exists(path):
            self.path = self.path.split("?", 1)[0] + ".html"
        return super().send_head()


http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()

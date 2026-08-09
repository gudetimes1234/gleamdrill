// Bootstrap only — a CLASSIC worker (Brython requires importScripts). Loads
// the vendored Brython runtime, then the bundled Gleam worker logic
// (src/algodrill/py_worker.gleam via the Makefile's worker target).
var version = new URLSearchParams(self.location.search).get("v") || "3.14.3";
importScripts(
  "/python-runtime/" + version + "/brython.min.js",
  "/python-runtime/" + version + "/brython_stdlib.js",
  "/python-worker-main.js",
);

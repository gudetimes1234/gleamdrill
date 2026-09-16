// The service worker: what makes a guest sitting work with no network.
//
// Two caches, two rules. The shell (the page, the bundle, the stylesheet,
// the worker bootstraps) is network-first with the cache as fallback, so a
// new deploy is picked up on the next load and an old one still opens on a
// train. The runtimes (the Gleam compiler wasm, its precompiled stdlib, the
// Brython build) live in version-stamped directories that never change, so
// they are cache-first and fill in as they are used -- or all at once, when
// the settings screen asks. /api/* is never touched: study data is the
// server's, and the app already knows what to show when it cannot be reached.
//
// The version strings below are pinned by tools/check-versions.sh, like every
// other copy of them.

const SHELL_CACHE = "gleamdrill-shell-v1";
const RUNTIME_CACHE = "gleamdrill-runtime";

const GLEAM_RUNTIME = "/gleam-runtime/1.18.1/";
const PYTHON_RUNTIME = "/python-runtime/3.14.3/";

const SHELL = [
  "/",
  "/gleamdrill.js",
  "/style.css",
  "/favicon.svg",
  "/manifest.webmanifest",
  "/gleam-worker.js",
  "/worker-main.js",
  "/python-worker.js",
  "/python-worker-main.js",
  "/ts-worker.js",
  "/ts-worker-main.js",
];

// Everything a run can fetch. The precompiled modules are pulled lazily by
// whatever the user's code imports, so warming the cache lists them all.
const RUNTIME = [
  ...["gleam_wasm.js", "gleam_wasm_bg.wasm", "stdlib.js"].map((f) => GLEAM_RUNTIME + f),
  ...["gleam.mjs", "gleam_stdlib.mjs", "dict.mjs", "my_package_ffi.mjs"].map(
    (f) => GLEAM_RUNTIME + "precompiled/" + f,
  ),
  ...[
    "bit_array", "bool", "bytes_tree", "dict", "dynamic", "float", "function",
    "int", "io", "list", "option", "order", "pair", "result", "set", "string",
    "string_tree", "uri",
  ].map((m) => GLEAM_RUNTIME + "precompiled/gleam/" + m + ".mjs"),
  GLEAM_RUNTIME + "precompiled/gleam/dynamic/decode.mjs",
  PYTHON_RUNTIME + "brython.min.js",
  PYTHON_RUNTIME + "brython_stdlib.js",
];

const isRuntime = (url) =>
  url.pathname.startsWith("/gleam-runtime/") || url.pathname.startsWith("/python-runtime/");

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name.startsWith("gleamdrill-shell-") && name !== SHELL_CACHE)
            .map((name) => caches.delete(name)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/") || url.pathname === "/health") return;

  if (isRuntime(url)) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

// Warm the runtime cache on request, reporting how far it got. Files already
// cached are not fetched again.
self.addEventListener("message", (event) => {
  if (event.data?.type !== "warm") return;
  const reply = (message) => event.source?.postMessage({ type: "warm", ...message });
  event.waitUntil(
    caches.open(RUNTIME_CACHE).then(async (cache) => {
      let done = 0;
      for (const path of RUNTIME) {
        if (!(await cache.match(path))) {
          try {
            const response = await fetch(path, { cache: "no-cache" });
            if (response.ok) await cache.put(path, response);
          } catch {
            reply({ ok: false, done, total: RUNTIME.length });
            return;
          }
        }
        done += 1;
        reply({ ok: true, done, total: RUNTIME.length, finished: done === RUNTIME.length });
      }
    }),
  );
});

// The worker URLs carry `?v=` for the runtimes they load; the cache key
// ignores the query so one entry serves every version stamp.
const cacheFirst = async (request) => {
  const cache = await caches.open(RUNTIME_CACHE);
  const hit = await cache.match(request, { ignoreSearch: true });
  if (hit) return hit;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
};

const networkFirst = async (request) => {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    const hit =
      (await cache.match(request, { ignoreSearch: true })) ||
      // Any in-app path falls back to the shell, as the server's own
      // try_files does.
      (request.mode === "navigate" ? await cache.match("/") : undefined);
    if (hit) return hit;
    throw error;
  }
};

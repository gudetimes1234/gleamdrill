// Owns the singleton compile-and-run worker on the page side. Logic (message
// decoding, timeouts semantics, state) lives in runner.gleam; this file only
// holds the Worker handle and the raw browser APIs.

let worker = null;

export function spawn(version, onMessage, onError) {
  if (worker) return;
  worker = new Worker("/gleam-worker.js?v=" + version, { type: "module" });
  worker.onmessage = (event) => onMessage(JSON.stringify(event.data));
  worker.onerror = (event) =>
    onError(String(event.message ?? "The Gleam runtime failed to load."));
}

export function restart(version, onMessage, onError) {
  worker?.terminate();
  worker = null;
  spawn(version, onMessage, onError);
}

export function post_run(id, solution, harness) {
  worker?.postMessage({ type: "run", id, solution, harness });
}

export function after(ms, callback) {
  setTimeout(callback, ms);
}

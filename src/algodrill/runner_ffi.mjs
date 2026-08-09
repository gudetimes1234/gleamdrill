// Holds the per-language Worker handles. Logic (message decoding, timeout
// semantics, state) lives in runner.gleam; this file only owns the raw
// browser APIs.

const workers = new Map();

export function spawn(language, url, isModule, onMessage, onError) {
  if (workers.has(language)) return;
  const worker = new Worker(url, isModule ? { type: "module" } : undefined);
  worker.onmessage = (event) => onMessage(JSON.stringify(event.data));
  worker.onerror = (event) =>
    onError(String(event.message ?? "The runtime failed to load."));
  workers.set(language, worker);
}

export function restart(language, url, isModule, onMessage, onError) {
  workers.get(language)?.terminate();
  workers.delete(language);
  spawn(language, url, isModule, onMessage, onError);
}

export function post_run(language, id, solution, harness) {
  workers.get(language)?.postMessage({ type: "run", id, solution, harness });
}

export function after(ms, callback) {
  setTimeout(callback, ms);
}

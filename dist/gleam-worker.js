// Bootstrap only — the worker's logic is Gleam (src/algodrill/worker.gleam),
// bundled into worker-main.js by the Makefile's `worker` target.
// The catch matters: main() awaits the wasm compiler and stdlib fetches, and
// an unhandled rejection in a worker never reaches Worker.onerror — without
// this, a failed fetch left the Run button on "Loading runtime…" forever.
import { main } from "./worker-main.js";
main().catch((error) => {
  postMessage({ type: "fatal", message: "The runtime failed to start: " + error });
});

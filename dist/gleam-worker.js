// Bootstrap only — the worker's logic is Gleam (src/algodrill/worker.gleam),
// bundled into worker-main.js by the Makefile's `worker` target.
import { main } from "./worker-main.js";
main();

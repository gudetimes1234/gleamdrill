// Bootstrap only — the worker's logic is Gleam (src/gleamdrill/runner/ts_worker.gleam),
// bundled with Sucrase into ts-worker-main.js by the Makefile's worker target.
import { main } from "./ts-worker-main.js";
main();

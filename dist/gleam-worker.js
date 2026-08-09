// Compiles and runs Gleam in the browser, the way tour.gleam.run does.
//
// Two modules are compiled per run: `solution` (what the user typed) and `check`
// (the per-problem harness, which imports solution). The compiler emits ES modules
// with relative specifiers, but a module loaded from a data: URL has an opaque base
// URL and cannot resolve anything relative — so every specifier is rewritten to an
// absolute URL before encoding. `check` additionally imports `./solution.mjs`, which
// is rewritten to a nested data: URL of the already-absolutised solution.
//
// Note: this relies on dynamic import() of data: URLs, which a strict
// script-src CSP would block. The site sets no CSP.

import init, {
  initialise_panic_hook,
  write_module,
  compile_package,
  read_compiled_javascript,
  reset_warnings,
  pop_warning,
} from "./gleam-runtime/1.18.1/gleam_wasm.js";
import stdlib from "./gleam-runtime/1.18.1/stdlib.js";

const PRECOMPILED = new URL(
  "./gleam-runtime/1.18.1/precompiled/",
  import.meta.url,
).href;

// One project, reused for every run. write_module overwrites, so there is no need to
// reset the filesystem and re-pay the stdlib write cost between runs.
const PROJECT = 0;

const IMPORT = /from\s+"\.\/(.+?)"/g;
const SOLUTION_IMPORT = /from\s+"\.\/solution\.mjs"/g;
const LOCATION = /┌─ \/src\/([^\s:]+):(\d+):(\d+)/;

await init();
initialise_panic_hook(false);
for (const [name, source] of Object.entries(stdlib)) {
  write_module(PROJECT, name, source);
}
postMessage({ type: "ready" });

function toDataUrl(js) {
  return (
    "data:text/javascript;base64," +
    btoa(unescape(encodeURIComponent(js)))
  );
}

function absolutise(js) {
  return js.replace(IMPORT, (_, specifier) => `from "${PRECOMPILED}${specifier}"`);
}

function listToArray(list) {
  const out = [];
  for (let cur = list; cur && cur.head !== undefined; cur = cur.tail) {
    out.push(cur.head);
  }
  return out;
}

function drainWarnings() {
  const warnings = [];
  for (;;) {
    const warning = pop_warning(PROJECT);
    if (!warning) return warnings;
    warnings.push(warning.trimStart());
  }
}

// compile_package throws the pretty-printed diagnostic as a bare string, not an Error.
// Line and column exist only as text inside it.
function describe(error, phase) {
  const message = typeof error === "string" ? error : String(error?.stack || error);
  const match = LOCATION.exec(message);
  return {
    phase,
    message,
    file: match ? match[1] : null,
    line: match ? Number(match[2]) : null,
    column: match ? Number(match[3]) : null,
  };
}

async function run(solution, harness) {
  write_module(PROJECT, "solution", solution);
  write_module(PROJECT, "check", harness);
  reset_warnings(PROJECT);

  let checkModule;
  try {
    compile_package(PROJECT, "javascript");

    const solutionJs = read_compiled_javascript(PROJECT, "solution");
    const checkJs = read_compiled_javascript(PROJECT, "check");
    if (!solutionJs || !checkJs) {
      throw "The compiler produced no output for this solution.";
    }

    const solutionUrl = toDataUrl(absolutise(solutionJs));
    checkModule = await import(
      toDataUrl(absolutise(checkJs.replace(SOLUTION_IMPORT, `from "${solutionUrl}"`)))
    );
  } catch (error) {
    return { error: describe(error, "compile"), warnings: drainWarnings() };
  }

  try {
    const cases = listToArray(checkModule.run()).map(([label, expected, actual]) => ({
      label,
      expected,
      actual,
      passed: expected === actual,
    }));
    return { cases, warnings: drainWarnings() };
  } catch (error) {
    return { error: describe(error, "run"), warnings: drainWarnings() };
  }
}

self.onmessage = async (event) => {
  const { type, id, solution, harness } = event.data;
  if (type !== "run") return;

  const outcome = await run(solution, harness);
  postMessage(
    outcome.error
      ? { type: "error", id, ...outcome.error, warnings: outcome.warnings }
      : { type: "result", id, cases: outcome.cases, warnings: outcome.warnings },
  );
};

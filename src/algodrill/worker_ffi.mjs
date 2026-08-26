// Platform glue for the compile-and-run worker. Everything with behavior lives in
// worker.gleam; this file only touches APIs Gleam cannot express:
//
// - Computed dynamic import() (the bundler must leave these as runtime code, which
//   it does exactly because the specifiers are not static strings).
// - try/catch around the wasm compiler, which throws bare strings.
// - Walking a Gleam List produced by the *dynamically compiled* code. That code is
//   built against the runtime's own prelude — a different class instance from this
//   bundle's prelude — so instanceof is unsafe; the walk is shape-based (head/tail).

export function resolve(relative) {
  return new URL(relative, self.location.href).href;
}

export function self_search() {
  return self.location.search;
}

export function load_compiler(base) {
  return import(base + "gleam_wasm.js").then(async (wasm) => {
    await wasm.default();
    wasm.initialise_panic_hook(false);
    return wasm;
  });
}

export function write_stdlib(compiler, base, project) {
  return import(base + "stdlib.js").then((mod) => {
    for (const [name, source] of Object.entries(mod.default)) {
      compiler.write_module(project, name, source);
    }
  });
}

export function write_module(compiler, project, name, code) {
  compiler.write_module(project, name, code);
}

// "" on success, the thrown pretty-printed diagnostic otherwise.
export function compile(compiler, project) {
  try {
    compiler.compile_package(project, "javascript");
    return "";
  } catch (error) {
    return typeof error === "string" ? error : String(error?.stack ?? error);
  }
}

export function read_js(compiler, project, name) {
  return compiler.read_compiled_javascript(project, name) ?? "";
}

export function reset_warnings(compiler, project) {
  compiler.reset_warnings(project);
}

// "" once drained.
export function pop_warning(compiler, project) {
  return compiler.pop_warning(project) ?? "";
}

export function to_data_url(js) {
  return "data:text/javascript;base64," + btoa(unescape(encodeURIComponent(js)));
}

// Anything the attempt prints. console.log is where io.println/print ends up,
// so patching the console is the whole mechanism — and the patch has to be in
// place before import(), because a module's top-level code runs then.
function capturedConsole() {
  const lines = [];
  const names = ["log", "info", "warn", "error", "debug"];
  const originals = {};
  const show = (value) => {
    if (typeof value === "string") return value;
    try {
      return JSON.stringify(value) ?? String(value);
    } catch {
      return String(value);
    }
  };
  for (const name of names) {
    originals[name] = console[name];
    console[name] = (...args) => lines.push(args.map(show).join(" "));
  }
  return {
    restore() {
      for (const name of names) console[name] = originals[name];
      return lines.join("\n");
    },
  };
}

// Resolves to {cases: [{label, expected, actual}], stdout} or {error, stdout}.
export function import_and_run(url) {
  const captured = capturedConsole();
  return import(url)
    .then((mod) => {
      const cases = [];
      for (let cur = mod.run(); cur && cur.head !== undefined; cur = cur.tail) {
        const [label, expected, actual] = cur.head;
        cases.push({ label, expected, actual });
      }
      return { cases };
    })
    .catch((error) => ({ error: String(error?.stack ?? error) }))
    .then((outcome) => ({ ...outcome, stdout: captured.restore() }));
}

export function post_json(payload) {
  postMessage(JSON.parse(payload));
}

export function on_message(handler) {
  self.onmessage = (event) => handler(event.data);
}

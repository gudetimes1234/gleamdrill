// Platform glue for the TypeScript worker. Sucrase strips the types (no
// typechecking — it's a drill runner); execution uses the same nested
// data:-URL import trick as the Gleam worker.

import { transform } from "sucrase";

export function post_json(payload) {
  postMessage(JSON.parse(payload));
}

export function on_message(handler) {
  self.onmessage = (event) => handler(event.data);
}

// {code} or {error: {message, line, column}} — sucrase syntax errors carry a
// loc when available.
export function transform_ts(source) {
  try {
    return { code: transform(source, { transforms: ["typescript"] }).code };
  } catch (error) {
    return {
      error: {
        message: String(error?.message ?? error),
        line: error?.loc?.line ?? null,
        column: error?.loc?.column ?? null,
      },
    };
  }
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
    .then((mod) => ({
      cases: mod.run().map(([label, expected, actual]) => ({
        label,
        expected,
        actual,
      })),
    }))
    .catch((error) => ({ error: String(error?.message ?? error) }))
    .then((outcome) => ({ ...outcome, stdout: captured.restore() }));
}

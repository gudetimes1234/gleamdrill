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

// Every stack frame names the data: URL the module ran from, which embeds the
// whole base64-encoded compiled module. Useless to a reader and huge.
function scrubDataUrls(text) {
  return String(text).replace(
    /data:text\/javascript;base64,[A-Za-z0-9+/=]+/g,
    "<compiled module>",
  );
}

// Resolves to {cases: [{label, expected, actual}], stdout} or
// {error, line?, column?, stdout}. A runtime throw's stack names the
// solution's data: URL; sucrase is line-preserving, so its first frame there
// maps straight back onto solution.ts. Best-effort -- message-only otherwise.
export function import_and_run(url, solutionUrl) {
  const captured = capturedConsole();
  return import(url)
    .then((mod) => ({
      cases: mod.run().map(([label, expected, actual]) => ({
        label,
        expected,
        actual,
      })),
    }))
    .catch((error) => {
      const outcome = { error: scrubDataUrls(error?.message ?? error) };
      const stack = typeof error?.stack === "string" ? error.stack : "";
      const frame = stack
        .split("\n")
        .map((row) => {
          const at = row.indexOf(solutionUrl);
          if (at === -1) return null;
          const position = row
            .slice(at + solutionUrl.length)
            .match(/^:(\d+):(\d+)/);
          return position && { line: Number(position[1]), column: Number(position[2]) };
        })
        .find(Boolean);
      if (frame) {
        outcome.line = frame.line;
        outcome.column = frame.column;
      }
      return outcome;
    })
    .then((outcome) => ({ ...outcome, stdout: captured.restore() }));
}

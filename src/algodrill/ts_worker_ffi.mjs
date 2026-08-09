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

// Resolves to {cases: [{label, expected, actual}]} or {error: "..."}.
export function import_and_run(url) {
  return import(url)
    .then((mod) => ({
      cases: mod.run().map(([label, expected, actual]) => ({
        label,
        expected,
        actual,
      })),
    }))
    .catch((error) => ({ error: String(error?.message ?? error) }));
}

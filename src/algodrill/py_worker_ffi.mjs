// Platform glue for the Python (Brython) worker — a CLASSIC worker: Brython
// needs importScripts, which module workers lack. Brython itself is loaded by
// the bootstrap before this bundle runs; __BRYTHON__ is a global here.

export function post_json(payload) {
  postMessage(JSON.parse(payload));
}

export function on_message(handler) {
  self.onmessage = (event) => handler(event.data);
}

// Runs a Python program synchronously. The program's epilogue stashes its
// results as a JSON string on the worker global; Brython reports errors by
// printing a traceback to console.error and throwing a Python exception
// object whose .args carries the message (and, for SyntaxError, a position
// tuple [file, line, col, text, ...]).
// Print capture. Chunks land in an array rather than onto a string, because a
// print inside a hot loop would otherwise rebuild the whole accumulated output
// on every write — quadratic, and slow enough to trip the run timeout. The cap
// is well above what anyone reads and well below what hurts.
const STDOUT_CAP = 200000;
let stdout = [];
let stdoutLength = 0;

self.__algodrill_write__ = (text) => {
  if (stdoutLength >= STDOUT_CAP) return;
  const chunk = String(text);
  stdout.push(chunk);
  stdoutLength += chunk.length;
};

export function run_python(program) {
  delete self.__algodrill_result__;
  stdout = [];
  stdoutLength = 0;
  let trace = "";
  const originalError = console.error;
  console.error = (...args) => {
    trace += args.join(" ") + "\n";
  };
  try {
    __BRYTHON__.runPythonSource(program, { id: "solution" });
    return { result: self.__algodrill_result__ ?? null };
  } catch (error) {
    const args = Array.isArray(error?.args) ? Array.from(error.args) : [];
    const position = Array.isArray(args[1]) ? args[1] : null;
    return {
      error: {
        marker: String(args[0] ?? ""),
        message: trace.trim() || String(args[0] ?? error?.message ?? error),
        line: position ? Number(position[1]) : null,
        column: position ? Number(position[2]) + 1 : null,
      },
    };
  } finally {
    console.error = originalError;
  }
}

// Whatever the program printed. Held outside the program's own namespace, so it
// survives a raise the same way it survives a clean finish.
export function captured_stdout() {
  return stdout.join("");
}

import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.search !== "function") throw new Error("__signature_mismatch__");
  return [
    ["search([-1, 0, 3, 5, 9, 12], 9)", show(4), show(solution.search([-1, 0, 3, 5, 9, 12], 9))],
    ["search([-1, 0, 3, 5, 9, 12], 2)", show(-1), show(solution.search([-1, 0, 3, 5, 9, 12], 2))],
    ["search([5], 5)", show(0), show(solution.search([5], 5))],
    ["search([], 1)", show(-1), show(solution.search([], 1))],
  ];
}

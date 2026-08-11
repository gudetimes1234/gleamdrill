import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.search !== "function") throw new Error("__signature_mismatch__");
  return [
    ["search([4, 5, 6, 7, 0, 1, 2], 0)", show(4), show(solution.search([4, 5, 6, 7, 0, 1, 2], 0))],
    ["search([4, 5, 6, 7, 0, 1, 2], 3)", show(-1), show(solution.search([4, 5, 6, 7, 0, 1, 2], 3))],
    ["search([1], 1)", show(0), show(solution.search([1], 1))],
    ["search([4, 5, 6, 7, 0, 1, 2], 6)", show(2), show(solution.search([4, 5, 6, 7, 0, 1, 2], 6))],
  ];
}

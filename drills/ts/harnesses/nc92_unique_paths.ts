import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.uniquePaths !== "function") throw new Error("__signature_mismatch__");
  return [
    ["uniquePaths(3, 7)", show(28), show(solution.uniquePaths(3, 7))],
    ["uniquePaths(3, 2)", show(3), show(solution.uniquePaths(3, 2))],
    ["uniquePaths(7, 3)", show(28), show(solution.uniquePaths(7, 3))],
    ["uniquePaths(1, 5)", show(1), show(solution.uniquePaths(1, 5))],
    ["uniquePaths(0, 5)", show(0), show(solution.uniquePaths(0, 5))],
    ["uniquePaths(10, 10)", show(48620), show(solution.uniquePaths(10, 10))],
  ];
}

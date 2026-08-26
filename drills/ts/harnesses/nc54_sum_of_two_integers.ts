import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.getSum !== "function") throw new Error("__signature_mismatch__");
  return [
    ["getSum(1, 2)", show(3), show(solution.getSum(1, 2))],
    ["getSum(2, 3)", show(5), show(solution.getSum(2, 3))],
    ["getSum(-1, 1)", show(0), show(solution.getSum(-1, 1))],
    ["getSum(-2, -3)", show(-5), show(solution.getSum(-2, -3))],
    ["getSum(0, 0)", show(0), show(solution.getSum(0, 0))],
    ["getSum(-1, -1)", show(-2), show(solution.getSum(-1, -1))],
    ["getSum(5, -3)", show(2), show(solution.getSum(5, -3))],
  ];
}

import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.findTargetSumWays !== "function") throw new Error("__signature_mismatch__");
  return [
    ["findTargetSumWays([1, 1, 1, 1, 1], 3)", show(5), show(solution.findTargetSumWays([1, 1, 1, 1, 1], 3))],
    ["findTargetSumWays([1], 1)", show(1), show(solution.findTargetSumWays([1], 1))],
    ["findTargetSumWays([1], 2)", show(0), show(solution.findTargetSumWays([1], 2))],
    ["findTargetSumWays([0, 0, 0, 0, 0], 0)", show(32), show(solution.findTargetSumWays([0, 0, 0, 0, 0], 0))],
    ["findTargetSumWays([], 0)", show(1), show(solution.findTargetSumWays([], 0))],
    ["findTargetSumWays([1, 2, 3, 4, 5], 3)", show(3), show(solution.findTargetSumWays([1, 2, 3, 4, 5], 3))],
  ];
}

import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.coinChange !== "function") throw new Error("__signature_mismatch__");
  return [
    ["coinChange([1, 2, 5], 11)", show(3), show(solution.coinChange([1, 2, 5], 11))],
    ["coinChange([2], 3)", show(-1), show(solution.coinChange([2], 3))],
    ["coinChange([1], 0)", show(0), show(solution.coinChange([1], 0))],
    ["coinChange([], 5)", show(-1), show(solution.coinChange([], 5))],
    ["coinChange([1, 3, 4], 6)", show(2), show(solution.coinChange([1, 3, 4], 6))],
    ["coinChange([2, 5, 10, 1], 27)", show(4), show(solution.coinChange([2, 5, 10, 1], 27))],
  ];
}

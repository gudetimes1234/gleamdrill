import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.maxProfit !== "function") throw new Error("__signature_mismatch__");
  return [
    ["maxProfit([1, 2, 3, 0, 2])", show(3), show(solution.maxProfit([1, 2, 3, 0, 2]))],
    ["maxProfit([1])", show(0), show(solution.maxProfit([1]))],
    ["maxProfit([])", show(0), show(solution.maxProfit([]))],
    ["maxProfit([2, 1])", show(0), show(solution.maxProfit([2, 1]))],
    ["maxProfit([1, 2, 3, 4, 5])", show(4), show(solution.maxProfit([1, 2, 3, 4, 5]))],
    ["maxProfit([6, 1, 3, 2, 4, 7])", show(6), show(solution.maxProfit([6, 1, 3, 2, 4, 7]))],
  ];
}

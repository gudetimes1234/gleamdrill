import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.maxProfit !== "function") throw new Error("__signature_mismatch__");
  return [
    ["maxProfit([7, 1, 5, 3, 6, 4])", show(5), show(solution.maxProfit([7, 1, 5, 3, 6, 4]))],
    ["maxProfit([7, 6, 4, 3, 1])", show(0), show(solution.maxProfit([7, 6, 4, 3, 1]))],
    ["maxProfit([])", show(0), show(solution.maxProfit([]))],
  ];
}

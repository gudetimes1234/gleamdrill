import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.minCostClimbingStairs !== "function") throw new Error("__signature_mismatch__");
  return [
    ["minCostClimbingStairs([10, 15, 20])", show(15), show(solution.minCostClimbingStairs([10, 15, 20]))],
    ["minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])", show(6), show(solution.minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]))],
    ["minCostClimbingStairs([0, 0])", show(0), show(solution.minCostClimbingStairs([0, 0]))],
    ["minCostClimbingStairs([1, 2])", show(1), show(solution.minCostClimbingStairs([1, 2]))],
    ["minCostClimbingStairs([0, 1, 1, 0])", show(1), show(solution.minCostClimbingStairs([0, 1, 1, 0]))],
    ["minCostClimbingStairs([])", show(0), show(solution.minCostClimbingStairs([]))],
  ];
}

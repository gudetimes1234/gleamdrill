import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.minCostConnectPoints !== "function") throw new Error("__signature_mismatch__");
  return [
    ["minCostConnectPoints(the five-point example)", show(20), show(solution.minCostConnectPoints([[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]))],
    ["minCostConnectPoints([[3,12],[-2,5],[-4,1]])", show(18), show(solution.minCostConnectPoints([[3, 12], [-2, 5], [-4, 1]]))],
    ["minCostConnectPoints([])", show(0), show(solution.minCostConnectPoints([]))],
    ["minCostConnectPoints([[1,1]]) -- nothing to connect", show(0), show(solution.minCostConnectPoints([[1, 1]]))],
    ["minCostConnectPoints([[0,0],[0,5]])", show(5), show(solution.minCostConnectPoints([[0, 0], [0, 5]]))],
  ];
}

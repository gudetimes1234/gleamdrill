import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.lastStoneWeight !== "function") throw new Error("__signature_mismatch__");
  return [
    ["lastStoneWeight([2, 7, 4, 1, 8, 1])", show(1), show(solution.lastStoneWeight([2, 7, 4, 1, 8, 1]))],
    ["lastStoneWeight([1])", show(1), show(solution.lastStoneWeight([1]))],
    ["lastStoneWeight([])", show(0), show(solution.lastStoneWeight([]))],
    ["lastStoneWeight([2, 2])", show(0), show(solution.lastStoneWeight([2, 2]))],
    ["lastStoneWeight([3, 7, 2])", show(2), show(solution.lastStoneWeight([3, 7, 2]))],
    ["lastStoneWeight([10, 4, 2, 10])", show(2), show(solution.lastStoneWeight([10, 4, 2, 10]))],
  ];
}

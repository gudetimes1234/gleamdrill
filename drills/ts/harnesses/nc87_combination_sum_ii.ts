import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

const sorted = (candidates: number[], target: number) =>
  solution
    .combinationSum2(candidates, target)
    .map((combination) => [...combination].sort((a, b) => a - b).join(","))
    .sort();

export function run(): [string, string, string][] {
  if (typeof solution.combinationSum2 !== "function") throw new Error("__signature_mismatch__");
  return [
    ["combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)", show(["1,1,6", "1,2,5", "1,7", "2,6"]), show(sorted([10, 1, 2, 7, 6, 1, 5], 8))],
    ["combinationSum2([2, 5, 2, 1, 2], 5)", show(["1,2,2", "5"]), show(sorted([2, 5, 2, 1, 2], 5))],
    ["combinationSum2([], 3)", show([]), show(sorted([], 3))],
    ["combinationSum2([1], 1)", show(["1"]), show(sorted([1], 1))],
    ["combinationSum2([2], 1)", show([]), show(sorted([2], 1))],
  ];
}

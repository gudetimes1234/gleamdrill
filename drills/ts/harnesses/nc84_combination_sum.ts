import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

const sorted = (candidates: number[], target: number) =>
  solution
    .combinationSum(candidates, target)
    .map((combination) => [...combination].sort((a, b) => a - b).join(","))
    .sort();

export function run(): [string, string, string][] {
  if (typeof solution.combinationSum !== "function") throw new Error("__signature_mismatch__");
  return [
    ["combinationSum([2, 3, 6, 7], 7)", show(["2,2,3", "7"]), show(sorted([2, 3, 6, 7], 7))],
    ["combinationSum([2, 3, 5], 8)", show(["2,2,2,2", "2,3,3", "3,5"]), show(sorted([2, 3, 5], 8))],
    ["combinationSum([2], 1)", show([]), show(sorted([2], 1))],
    ["combinationSum([1], 0)", show([""]), show(sorted([1], 0))],
    ["combinationSum([], 3)", show([]), show(sorted([], 3))],
  ];
}

import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

const sorted = (nums: number[]) =>
  solution
    .subsetsWithDup(nums)
    .map((subset) => [...subset].sort((a, b) => a - b).join(","))
    .sort();

export function run(): [string, string, string][] {
  if (typeof solution.subsetsWithDup !== "function") throw new Error("__signature_mismatch__");
  return [
    ["subsetsWithDup([1, 2, 2])", show(["", "1", "1,2", "1,2,2", "2", "2,2"]), show(sorted([1, 2, 2]))],
    ["subsetsWithDup([0])", show(["", "0"]), show(sorted([0]))],
    ["subsetsWithDup([])", show([""]), show(sorted([]))],
    ["subsetsWithDup([1, 1, 1])", show(["", "1", "1,1", "1,1,1"]), show(sorted([1, 1, 1]))],
    ["subsetsWithDup([4, 4, 4, 1, 4]) count", show(10), show(solution.subsetsWithDup([4, 4, 4, 1, 4]).length)],
  ];
}

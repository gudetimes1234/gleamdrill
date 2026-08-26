import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

// Both the outer order and the order within each subset are free.
const sorted = (nums: number[]) =>
  solution
    .subsets(nums)
    .map((subset) => [...subset].sort((a, b) => a - b).join(","))
    .sort();

export function run(): [string, string, string][] {
  if (typeof solution.subsets !== "function") throw new Error("__signature_mismatch__");
  return [
    ["subsets([1, 2, 3])", show(["", "1", "1,2", "1,2,3", "1,3", "2", "2,3", "3"]), show(sorted([1, 2, 3]))],
    ["subsets([0])", show(["", "0"]), show(sorted([0]))],
    ["subsets([])", show([""]), show(sorted([]))],
    ["subsets of five elements count", show(32), show(solution.subsets([1, 2, 3, 4, 5]).length)],
  ];
}

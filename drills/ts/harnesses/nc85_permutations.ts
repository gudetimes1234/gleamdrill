import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

// The outer order is free but the order *within* each permutation is the answer.
const sorted = (nums: number[]) => solution.permute(nums).map((p) => p.join(",")).sort();

export function run(): [string, string, string][] {
  if (typeof solution.permute !== "function") throw new Error("__signature_mismatch__");
  return [
    ["permute([1, 2, 3])", show(["1,2,3", "1,3,2", "2,1,3", "2,3,1", "3,1,2", "3,2,1"]), show(sorted([1, 2, 3]))],
    ["permute([0, 1])", show(["0,1", "1,0"]), show(sorted([0, 1]))],
    ["permute([1])", show(["1"]), show(sorted([1]))],
    ["permute([])", show([""]), show(sorted([]))],
    ["permute of four elements count", show(24), show(solution.permute([1, 2, 3, 4]).length)],
  ];
}

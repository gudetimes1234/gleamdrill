import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.twoSum !== "function") throw new Error("__signature_mismatch__");
  return [
    ["twoSum([2, 7, 11, 15], 9)", show([0, 1]), show(solution.twoSum([2, 7, 11, 15], 9))],
    ["twoSum([3, 2, 4], 6)", show([1, 2]), show(solution.twoSum([3, 2, 4], 6))],
    ["twoSum([3, 3], 6)", show([0, 1]), show(solution.twoSum([3, 3], 6))],
    ["twoSum([1, 2], 7)", show([]), show(solution.twoSum([1, 2], 7))],
  ];
}

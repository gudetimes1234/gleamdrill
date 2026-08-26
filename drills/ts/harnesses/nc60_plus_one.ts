import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.plusOne !== "function") throw new Error("__signature_mismatch__");
  return [
    ["plusOne([1, 2, 3])", show([1, 2, 4]), show(solution.plusOne([1, 2, 3]))],
    ["plusOne([4, 3, 2, 1])", show([4, 3, 2, 2]), show(solution.plusOne([4, 3, 2, 1]))],
    ["plusOne([9])", show([1, 0]), show(solution.plusOne([9]))],
    ["plusOne([9, 9])", show([1, 0, 0]), show(solution.plusOne([9, 9]))],
    ["plusOne([0])", show([1]), show(solution.plusOne([0]))],
    ["plusOne([1, 9, 9])", show([2, 0, 0]), show(solution.plusOne([1, 9, 9]))],
  ];
}

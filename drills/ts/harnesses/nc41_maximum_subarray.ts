import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.maxSubArray !== "function") throw new Error("__signature_mismatch__");
  return [
    ["maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])", show(6), show(solution.maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))],
    ["maxSubArray([1])", show(1), show(solution.maxSubArray([1]))],
    ["maxSubArray([5, 4, -1, 7, 8])", show(23), show(solution.maxSubArray([5, 4, -1, 7, 8]))],
    ["maxSubArray([-1])", show(-1), show(solution.maxSubArray([-1]))],
    ["maxSubArray([-2, -1])", show(-1), show(solution.maxSubArray([-2, -1]))],
    ["maxSubArray([])", show(0), show(solution.maxSubArray([]))],
  ];
}

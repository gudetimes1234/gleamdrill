import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.canPartition !== "function") throw new Error("__signature_mismatch__");
  return [
    ["canPartition([1, 5, 11, 5])", show(true), show(solution.canPartition([1, 5, 11, 5]))],
    ["canPartition([1, 2, 3, 5])", show(false), show(solution.canPartition([1, 2, 3, 5]))],
    ["canPartition([2, 2])", show(true), show(solution.canPartition([2, 2]))],
    ["canPartition([1])", show(false), show(solution.canPartition([1]))],
    ["canPartition([1, 1])", show(true), show(solution.canPartition([1, 1]))],
    ["canPartition([3, 3, 3, 4, 5])", show(true), show(solution.canPartition([3, 3, 3, 4, 5]))],
  ];
}

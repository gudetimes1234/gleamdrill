import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.lengthOfLIS !== "function") throw new Error("__signature_mismatch__");
  return [
    ["lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])", show(4), show(solution.lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]))],
    ["lengthOfLIS([0, 1, 0, 3, 2, 3])", show(4), show(solution.lengthOfLIS([0, 1, 0, 3, 2, 3]))],
    ["lengthOfLIS([7, 7, 7, 7, 7, 7, 7])", show(1), show(solution.lengthOfLIS([7, 7, 7, 7, 7, 7, 7]))],
    ["lengthOfLIS([])", show(0), show(solution.lengthOfLIS([]))],
    ["lengthOfLIS([1])", show(1), show(solution.lengthOfLIS([1]))],
    ["lengthOfLIS([4, 10, 4, 3, 8, 9])", show(3), show(solution.lengthOfLIS([4, 10, 4, 3, 8, 9]))],
  ];
}

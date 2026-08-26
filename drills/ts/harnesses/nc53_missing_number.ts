import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.missingNumber !== "function") throw new Error("__signature_mismatch__");
  return [
    ["missingNumber([3, 0, 1])", show(2), show(solution.missingNumber([3, 0, 1]))],
    ["missingNumber([0, 1])", show(2), show(solution.missingNumber([0, 1]))],
    ["missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])", show(8), show(solution.missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]))],
    ["missingNumber([0])", show(1), show(solution.missingNumber([0]))],
    ["missingNumber([1])", show(0), show(solution.missingNumber([1]))],
    ["missingNumber([])", show(0), show(solution.missingNumber([]))],
  ];
}

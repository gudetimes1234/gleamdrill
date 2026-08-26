import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.singleNumber !== "function") throw new Error("__signature_mismatch__");
  return [
    ["singleNumber([2, 2, 1])", show(1), show(solution.singleNumber([2, 2, 1]))],
    ["singleNumber([4, 1, 2, 1, 2])", show(4), show(solution.singleNumber([4, 1, 2, 1, 2]))],
    ["singleNumber([1])", show(1), show(solution.singleNumber([1]))],
    ["singleNumber([-1, -1, -3])", show(-3), show(solution.singleNumber([-1, -1, -3]))],
    ["singleNumber([0, 1, 1])", show(0), show(solution.singleNumber([0, 1, 1]))],
  ];
}

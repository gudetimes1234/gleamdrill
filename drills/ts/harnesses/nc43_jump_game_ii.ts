import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.jump !== "function") throw new Error("__signature_mismatch__");
  return [
    ["jump([2, 3, 1, 1, 4])", show(2), show(solution.jump([2, 3, 1, 1, 4]))],
    ["jump([2, 3, 0, 1, 4])", show(2), show(solution.jump([2, 3, 0, 1, 4]))],
    ["jump([0])", show(0), show(solution.jump([0]))],
    ["jump([1])", show(0), show(solution.jump([1]))],
    ["jump([1, 2, 3])", show(2), show(solution.jump([1, 2, 3]))],
    ["jump([1, 1, 1, 1])", show(3), show(solution.jump([1, 1, 1, 1]))],
  ];
}

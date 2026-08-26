import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.maxProduct !== "function") throw new Error("__signature_mismatch__");
  return [
    ["maxProduct([2, 3, -2, 4])", show(6), show(solution.maxProduct([2, 3, -2, 4]))],
    ["maxProduct([-2, 0, -1])", show(0), show(solution.maxProduct([-2, 0, -1]))],
    ["maxProduct([-2, 3, -4])", show(24), show(solution.maxProduct([-2, 3, -4]))],
    ["maxProduct([0])", show(0), show(solution.maxProduct([0]))],
    ["maxProduct([-2])", show(-2), show(solution.maxProduct([-2]))],
    ["maxProduct([2, -5, -2, -4, 3])", show(24), show(solution.maxProduct([2, -5, -2, -4, 3]))],
    ["maxProduct([])", show(0), show(solution.maxProduct([]))],
  ];
}

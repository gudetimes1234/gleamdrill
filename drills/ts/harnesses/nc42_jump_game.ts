import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.canJump !== "function") throw new Error("__signature_mismatch__");
  return [
    ["canJump([2, 3, 1, 1, 4])", show(true), show(solution.canJump([2, 3, 1, 1, 4]))],
    ["canJump([3, 2, 1, 0, 4])", show(false), show(solution.canJump([3, 2, 1, 0, 4]))],
    ["canJump([0])", show(true), show(solution.canJump([0]))],
    ["canJump([])", show(true), show(solution.canJump([]))],
    ["canJump([1, 0, 1, 0])", show(false), show(solution.canJump([1, 0, 1, 0]))],
    ["canJump([2, 0, 0])", show(true), show(solution.canJump([2, 0, 0]))],
  ];
}

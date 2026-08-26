import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.trap !== "function") throw new Error("__signature_mismatch__");
  return [
    ["trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])", show(6), show(solution.trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))],
    ["trap([4, 2, 0, 3, 2, 5])", show(9), show(solution.trap([4, 2, 0, 3, 2, 5]))],
    ["trap([])", show(0), show(solution.trap([]))],
    ["trap([3])", show(0), show(solution.trap([3]))],
    ["trap([2, 0, 2])", show(2), show(solution.trap([2, 0, 2]))],
    ["trap([5, 4, 3, 2, 1])", show(0), show(solution.trap([5, 4, 3, 2, 1]))],
  ];
}

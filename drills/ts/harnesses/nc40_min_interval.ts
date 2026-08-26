import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.minInterval !== "function") throw new Error("__signature_mismatch__");
  return [
    ["minInterval([[1, 4], [2, 4], [3, 6], [4, 4]], [2, 3, 4, 5])", show([3, 3, 1, 4]), show(solution.minInterval([[1, 4], [2, 4], [3, 6], [4, 4]], [2, 3, 4, 5]))],
    ["minInterval([[2, 3], [2, 5], [1, 8], [20, 25]], [2, 19, 5, 22])", show([2, -1, 4, 6]), show(solution.minInterval([[2, 3], [2, 5], [1, 8], [20, 25]], [2, 19, 5, 22]))],
    ["minInterval([], [1, 2])", show([-1, -1]), show(solution.minInterval([], [1, 2]))],
    ["minInterval([[1, 10]], [])", show([]), show(solution.minInterval([[1, 10]], []))],
    ["minInterval([[1, 3]], [0, 4])", show([-1, -1]), show(solution.minInterval([[1, 3]], [0, 4]))],
  ];
}

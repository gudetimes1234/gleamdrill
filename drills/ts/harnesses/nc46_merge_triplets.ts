import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.mergeTriplets !== "function") throw new Error("__signature_mismatch__");
  return [
    ["mergeTriplets([[2, 5, 3], [1, 8, 4], [1, 7, 5]], [2, 7, 5])", show(true), show(solution.mergeTriplets([[2, 5, 3], [1, 8, 4], [1, 7, 5]], [2, 7, 5]))],
    ["mergeTriplets([[3, 4, 5], [4, 5, 6]], [3, 2, 5])", show(false), show(solution.mergeTriplets([[3, 4, 5], [4, 5, 6]], [3, 2, 5]))],
    ["mergeTriplets([[2, 5, 3], [2, 3, 4], [1, 2, 5], [5, 2, 3]], [5, 5, 5])", show(true), show(solution.mergeTriplets([[2, 5, 3], [2, 3, 4], [1, 2, 5], [5, 2, 3]], [5, 5, 5]))],
    ["mergeTriplets([[1, 1, 1]], [1, 1, 1])", show(true), show(solution.mergeTriplets([[1, 1, 1]], [1, 1, 1]))],
    ["mergeTriplets([], [1, 1, 1])", show(false), show(solution.mergeTriplets([], [1, 1, 1]))],
    ["mergeTriplets([[1, 2, 3]], [3, 2, 1])", show(false), show(solution.mergeTriplets([[1, 2, 3]], [3, 2, 1]))],
  ];
}

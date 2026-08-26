import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.minEatingSpeed !== "function") throw new Error("__signature_mismatch__");
  return [
    ["minEatingSpeed([3, 6, 7, 11], 8)", show(4), show(solution.minEatingSpeed([3, 6, 7, 11], 8))],
    ["minEatingSpeed([30, 11, 23, 4, 20], 5)", show(30), show(solution.minEatingSpeed([30, 11, 23, 4, 20], 5))],
    ["minEatingSpeed([30, 11, 23, 4, 20], 6)", show(23), show(solution.minEatingSpeed([30, 11, 23, 4, 20], 6))],
    ["minEatingSpeed([1], 1)", show(1), show(solution.minEatingSpeed([1], 1))],
    ["minEatingSpeed([4, 4, 4, 4], 4)", show(4), show(solution.minEatingSpeed([4, 4, 4, 4], 4))],
    ["minEatingSpeed([1, 1, 1, 10], 4)", show(10), show(solution.minEatingSpeed([1, 1, 1, 10], 4))],
  ];
}

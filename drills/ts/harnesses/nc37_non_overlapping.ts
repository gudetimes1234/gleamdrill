import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.eraseOverlapIntervals !== "function") throw new Error("__signature_mismatch__");
  return [
    ["eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])", show(1), show(solution.eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]))],
    ["eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]])", show(2), show(solution.eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]))],
    ["eraseOverlapIntervals([[1, 2], [2, 3]])", show(0), show(solution.eraseOverlapIntervals([[1, 2], [2, 3]]))],
    ["eraseOverlapIntervals([])", show(0), show(solution.eraseOverlapIntervals([]))],
    ["eraseOverlapIntervals([[1, 100], [11, 22], [1, 11], [2, 12]])", show(2), show(solution.eraseOverlapIntervals([[1, 100], [11, 22], [1, 11], [2, 12]]))],
  ];
}

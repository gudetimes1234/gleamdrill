import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

// Any order is acceptable, so every case compares sorted.
const sorted = (points: number[][], k: number) =>
  solution.kClosest(points, k).sort((a, b) => a[0] - b[0] || a[1] - b[1]);

export function run(): [string, string, string][] {
  if (typeof solution.kClosest !== "function") throw new Error("__signature_mismatch__");
  return [
    ["kClosest([[1, 3], [-2, 2]], 1)", show([[-2, 2]]), show(sorted([[1, 3], [-2, 2]], 1))],
    ["kClosest([[3, 3], [5, -1], [-2, 4]], 2)", show([[-2, 4], [3, 3]]), show(sorted([[3, 3], [5, -1], [-2, 4]], 2))],
    ["kClosest([], 0)", show([]), show(sorted([], 0))],
    ["kClosest([[0, 0]], 1)", show([[0, 0]]), show(sorted([[0, 0]], 1))],
    ["kClosest([[1, 1], [2, 2], [3, 3]], 2)", show([[1, 1], [2, 2]]), show(sorted([[1, 1], [2, 2], [3, 3]], 2))],
  ];
}

import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.rotate !== "function") throw new Error("__signature_mismatch__");
  return [
    ["rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]])", show([[7, 4, 1], [8, 5, 2], [9, 6, 3]]), show(solution.rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))],
    ["rotate([[1, 2], [3, 4]])", show([[3, 1], [4, 2]]), show(solution.rotate([[1, 2], [3, 4]]))],
    ["rotate([[1]])", show([[1]]), show(solution.rotate([[1]]))],
    ["rotate([])", show([]), show(solution.rotate([]))],
    ["rotate(4x4)", show([[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]]), show(solution.rotate([[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]))],
  ];
}

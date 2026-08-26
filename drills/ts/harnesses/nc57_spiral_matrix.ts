import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.spiralOrder !== "function") throw new Error("__signature_mismatch__");
  return [
    ["spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]])", show([1, 2, 3, 6, 9, 8, 7, 4, 5]), show(solution.spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))],
    ["spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])", show([1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]), show(solution.spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]))],
    ["spiralOrder([[1]])", show([1]), show(solution.spiralOrder([[1]]))],
    ["spiralOrder([])", show([]), show(solution.spiralOrder([]))],
    ["spiralOrder([[1, 2, 3]])", show([1, 2, 3]), show(solution.spiralOrder([[1, 2, 3]]))],
    ["spiralOrder([[1], [2], [3]])", show([1, 2, 3]), show(solution.spiralOrder([[1], [2], [3]]))],
  ];
}

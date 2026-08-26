import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

const MATRIX = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]];

export function run(): [string, string, string][] {
  if (typeof solution.searchMatrix !== "function") throw new Error("__signature_mismatch__");
  return [
    ["searchMatrix(matrix, 3)", show(true), show(solution.searchMatrix(MATRIX, 3))],
    ["searchMatrix(matrix, 13)", show(false), show(solution.searchMatrix(MATRIX, 13))],
    ["searchMatrix(matrix, 60)", show(true), show(solution.searchMatrix(MATRIX, 60))],
    ["searchMatrix([[1]], 1)", show(true), show(solution.searchMatrix([[1]], 1))],
    ["searchMatrix([], 1)", show(false), show(solution.searchMatrix([], 1))],
    ["searchMatrix([[1], [3], [5]], 5)", show(true), show(solution.searchMatrix([[1], [3], [5]], 5))],
  ];
}

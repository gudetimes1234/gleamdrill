import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

// Nine row strings rather than a 9x9 literal: the board stays readable, and a
// single changed cell is what each invalid case is.
const ROWS = [
  "53..7....",
  "6..195...",
  ".98....6.",
  "8...6...3",
  "4..8.3..1",
  "7...2...6",
  ".6....28.",
  "...419..5",
  "....8..79",
];

const board = () => ROWS.map((row) => row.split(""));

const withCell = (r: number, c: number, value: string) => {
  const grid = board();
  grid[r][c] = value;
  return grid;
};

export function run(): [string, string, string][] {
  if (typeof solution.isValidSudoku !== "function") throw new Error("__signature_mismatch__");
  return [
    ["isValidSudoku(valid board)", show(true), show(solution.isValidSudoku(board()))],
    ["isValidSudoku(5 twice in row 0)", show(false), show(solution.isValidSudoku(withCell(0, 2, "5")))],
    ["isValidSudoku(5 twice in column 0, different boxes)", show(false), show(solution.isValidSudoku(withCell(3, 0, "5")))],
    ["isValidSudoku(3 twice in the top-left box only)", show(false), show(solution.isValidSudoku(withCell(2, 0, "3")))],
    ["isValidSudoku(empty board)", show(true), show(solution.isValidSudoku(Array.from({ length: 9 }, () => Array(9).fill("."))))],
  ];
}

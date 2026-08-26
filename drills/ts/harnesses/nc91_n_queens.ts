import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

const sorted = (n: number) => solution.solveNQueens(n).map((board) => board.join("|")).sort();

export function run(): [string, string, string][] {
  if (typeof solution.solveNQueens !== "function") throw new Error("__signature_mismatch__");
  return [
    ["solveNQueens(4)", show(["..Q.|Q...|...Q|.Q..", ".Q..|...Q|Q...|..Q."]), show(sorted(4))],
    ["solveNQueens(1)", show(["Q"]), show(sorted(1))],
    ["solveNQueens(2)", show([]), show(sorted(2))],
    ["solveNQueens(3)", show([]), show(sorted(3))],
    ["solveNQueens(6) count", show(4), show(solution.solveNQueens(6).length)],
  ];
}

import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

const board = () => ["ABCE", "SFCS", "ADEE"].map((row) => row.split(""));

export function run(): [string, string, string][] {
  if (typeof solution.exist !== "function") throw new Error("__signature_mismatch__");
  return [
    ["exist(board, 'ABCCED')", show(true), show(solution.exist(board(), "ABCCED"))],
    ["exist(board, 'SEE')", show(true), show(solution.exist(board(), "SEE"))],
    ["exist(board, 'ABCB')", show(false), show(solution.exist(board(), "ABCB"))],
    ["exist(board, '')", show(true), show(solution.exist(board(), ""))],
    ["exist(board, 'Z')", show(false), show(solution.exist(board(), "Z"))],
    ["exist([], 'A')", show(false), show(solution.exist([], "A"))],
  ];
}

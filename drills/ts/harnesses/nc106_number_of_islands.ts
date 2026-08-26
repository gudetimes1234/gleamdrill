import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";
const board = (rows: string[]) => rows.map((row) => row.split(""));

export function run(): [string, string, string][] {
  if (typeof solution.numIslands !== "function") throw new Error("__signature_mismatch__");
  return [
    ["numIslands(one big island)", show(1), show(solution.numIslands(board(["11110", "11010", "11000", "00000"])))],
    ["numIslands(three islands)", show(3), show(solution.numIslands(board(["11000", "11000", "00100", "00011"])))],
    ["numIslands(all water)", show(0), show(solution.numIslands(board(["000", "000"])))],
    ["numIslands([])", show(0), show(solution.numIslands([]))],
    ["numIslands(diagonal squares are separate)", show(2), show(solution.numIslands(board(["10", "01"])))],
  ];
}

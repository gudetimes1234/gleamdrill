import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

const GRID = [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]];
const sorted = (g: number[][]) => solution.pacificAtlantic(g).sort((a, b) => a[0] - b[0] || a[1] - b[1]);

export function run(): [string, string, string][] {
  if (typeof solution.pacificAtlantic !== "function") throw new Error("__signature_mismatch__");
  return [
    ["pacificAtlantic(the 5x5 example)", show([[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]), show(sorted(GRID))],
    ["pacificAtlantic([[1]])", show([[0, 0]]), show(sorted([[1]]))],
    ["pacificAtlantic([])", show([]), show(sorted([]))],
    ["pacificAtlantic([[1,1],[1,1]])", show([[0, 0], [0, 1], [1, 0], [1, 1]]), show(sorted([[1, 1], [1, 1]]))],
  ];
}

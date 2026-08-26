import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.maxAreaOfIsland !== "function") throw new Error("__signature_mismatch__");
  return [
    ["maxAreaOfIsland([[1,1,0],[1,0,0],[0,0,1]])", show(3), show(solution.maxAreaOfIsland([[1, 1, 0], [1, 0, 0], [0, 0, 1]]))],
    ["maxAreaOfIsland([[0,0],[0,0]])", show(0), show(solution.maxAreaOfIsland([[0, 0], [0, 0]]))],
    ["maxAreaOfIsland([])", show(0), show(solution.maxAreaOfIsland([]))],
    ["maxAreaOfIsland([[1]])", show(1), show(solution.maxAreaOfIsland([[1]]))],
    ["maxAreaOfIsland([[1,1,1],[1,1,1]])", show(6), show(solution.maxAreaOfIsland([[1, 1, 1], [1, 1, 1]]))],
  ];
}

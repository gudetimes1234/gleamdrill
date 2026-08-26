import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.validTree !== "function") throw new Error("__signature_mismatch__");
  return [
    ["validTree(5, [[0,1],[0,2],[0,3],[1,4]])", show(true), show(solution.validTree(5, [[0, 1], [0, 2], [0, 3], [1, 4]]))],
    ["validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])", show(false), show(solution.validTree(5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]))],
    ["validTree(1, [])", show(true), show(solution.validTree(1, []))],
    ["validTree(0, [])", show(true), show(solution.validTree(0, []))],
    ["validTree(2, []) -- disconnected", show(false), show(solution.validTree(2, []))],
    ["validTree(4, [[0,1],[2,3]]) -- two trees", show(false), show(solution.validTree(4, [[0, 1], [2, 3]]))],
  ];
}

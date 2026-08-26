import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.canFinish !== "function") throw new Error("__signature_mismatch__");
  return [
    ["canFinish(2, [[1,0]])", show(true), show(solution.canFinish(2, [[1, 0]]))],
    ["canFinish(2, [[1,0],[0,1]])", show(false), show(solution.canFinish(2, [[1, 0], [0, 1]]))],
    ["canFinish(1, [])", show(true), show(solution.canFinish(1, []))],
    ["canFinish(0, [])", show(true), show(solution.canFinish(0, []))],
    ["canFinish(4, [[1,0],[2,1],[3,2]])", show(true), show(solution.canFinish(4, [[1, 0], [2, 1], [3, 2]]))],
    ["canFinish(3, [[0,1],[1,2],[2,0]])", show(false), show(solution.canFinish(3, [[0, 1], [1, 2], [2, 0]]))],
  ];
}

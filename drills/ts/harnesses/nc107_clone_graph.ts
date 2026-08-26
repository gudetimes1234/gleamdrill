import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.cloneGraph !== "function") throw new Error("__signature_mismatch__");
  return [
    ["cloneGraph([[1,3],[0,2],[1,3],[0,2]], 0)", show([[1, 3], [0, 2], [1, 3], [0, 2]]), show(solution.cloneGraph([[1, 3], [0, 2], [1, 3], [0, 2]], 0))],
    ["cloneGraph([[1],[0]], 0)", show([[1], [0]]), show(solution.cloneGraph([[1], [0]], 0))],
    ["cloneGraph([[]], 0)", show([[]]), show(solution.cloneGraph([[]], 0))],
    ["cloneGraph([], 0)", show([]), show(solution.cloneGraph([], 0))],
    ["cloneGraph([[1],[0],[3],[2]], 2) -- renumbered", show([[1], [0]]), show(solution.cloneGraph([[1], [0], [3], [2]], 2))],
    ["cloneGraph([[],[]], 1) -- only the reachable part", show([[]]), show(solution.cloneGraph([[], []], 1))],
  ];
}

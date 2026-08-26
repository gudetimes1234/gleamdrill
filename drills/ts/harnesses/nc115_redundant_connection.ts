import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.findRedundantConnection !== "function") throw new Error("__signature_mismatch__");
  return [
    ["findRedundantConnection([[1,2],[1,3],[2,3]])", show([2, 3]), show(solution.findRedundantConnection([[1, 2], [1, 3], [2, 3]]))],
    ["findRedundantConnection([[1,2],[2,3],[3,4],[1,4],[1,5]])", show([1, 4]), show(solution.findRedundantConnection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]))],
    ["findRedundantConnection([[1,2],[2,1]])", show([2, 1]), show(solution.findRedundantConnection([[1, 2], [2, 1]]))],
  ];
}

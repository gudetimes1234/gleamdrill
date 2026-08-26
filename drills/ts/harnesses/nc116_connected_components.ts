import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.countComponents !== "function") throw new Error("__signature_mismatch__");
  return [
    ["countComponents(5, [[0,1],[1,2],[3,4]])", show(2), show(solution.countComponents(5, [[0, 1], [1, 2], [3, 4]]))],
    ["countComponents(5, [[0,1],[1,2],[2,3],[3,4]])", show(1), show(solution.countComponents(5, [[0, 1], [1, 2], [2, 3], [3, 4]]))],
    ["countComponents(3, [])", show(3), show(solution.countComponents(3, []))],
    ["countComponents(0, [])", show(0), show(solution.countComponents(0, []))],
    ["countComponents(1, [])", show(1), show(solution.countComponents(1, []))],
    ["countComponents(4, [[0,1],[1,0]])", show(3), show(solution.countComponents(4, [[0, 1], [1, 0]]))],
  ];
}

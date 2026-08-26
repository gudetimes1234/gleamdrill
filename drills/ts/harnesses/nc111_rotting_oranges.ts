import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.orangesRotting !== "function") throw new Error("__signature_mismatch__");
  return [
    ["orangesRotting([[2,1,1],[1,1,0],[0,1,1]])", show(4), show(solution.orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]]))],
    ["orangesRotting([[2,1,1],[0,1,1],[1,0,1]])", show(-1), show(solution.orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]]))],
    ["orangesRotting([[0,2]])", show(0), show(solution.orangesRotting([[0, 2]]))],
    ["orangesRotting([])", show(0), show(solution.orangesRotting([]))],
    ["orangesRotting([[1]])", show(-1), show(solution.orangesRotting([[1]]))],
    ["orangesRotting([[0]])", show(0), show(solution.orangesRotting([[0]]))],
  ];
}

import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";
const INF = 2147483647;

export function run(): [string, string, string][] {
  if (typeof solution.wallsAndGates !== "function") throw new Error("__signature_mismatch__");
  return [
    ["wallsAndGates(the classic 4x4)", show([[3, -1, 0, 1], [2, 2, 1, -1], [1, -1, 2, -1], [0, -1, 3, 4]]), show(solution.wallsAndGates([[INF, -1, 0, INF], [INF, INF, INF, -1], [INF, -1, INF, -1], [0, -1, INF, INF]]))],
    ["wallsAndGates([[0]])", show([[0]]), show(solution.wallsAndGates([[0]]))],
    ["wallsAndGates([[-1]])", show([[-1]]), show(solution.wallsAndGates([[-1]]))],
    ["wallsAndGates([])", show([]), show(solution.wallsAndGates([]))],
    ["wallsAndGates(no gate at all)", show([[INF, INF]]), show(solution.wallsAndGates([[INF, INF]]))],
  ];
}

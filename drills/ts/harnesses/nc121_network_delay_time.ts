import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.networkDelayTime !== "function") throw new Error("__signature_mismatch__");
  return [
    ["networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2)", show(2), show(solution.networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2))],
    ["networkDelayTime([[1,2,1]], 2, 1)", show(1), show(solution.networkDelayTime([[1, 2, 1]], 2, 1))],
    ["networkDelayTime([[1,2,1]], 2, 2) -- node 1 is unreachable", show(-1), show(solution.networkDelayTime([[1, 2, 1]], 2, 2))],
    ["networkDelayTime([], 1, 1)", show(0), show(solution.networkDelayTime([], 1, 1))],
    ["networkDelayTime(the long way round is shorter, 3, 1)", show(3), show(solution.networkDelayTime([[1, 2, 1], [2, 3, 2], [1, 3, 4]], 3, 1))],
  ];
}

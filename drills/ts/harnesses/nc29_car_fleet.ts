import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.carFleet !== "function") throw new Error("__signature_mismatch__");
  return [
    ["carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])", show(3), show(solution.carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]))],
    ["carFleet(10, [3], [3])", show(1), show(solution.carFleet(10, [3], [3]))],
    ["carFleet(100, [0, 2, 4], [4, 2, 1])", show(1), show(solution.carFleet(100, [0, 2, 4], [4, 2, 1]))],
    ["carFleet(10, [6, 8], [3, 2])", show(2), show(solution.carFleet(10, [6, 8], [3, 2]))],
    ["carFleet(10, [], [])", show(0), show(solution.carFleet(10, [], []))],
    ["carFleet(10, [0, 4, 2], [2, 1, 3])", show(1), show(solution.carFleet(10, [0, 4, 2], [2, 1, 3]))],
  ];
}

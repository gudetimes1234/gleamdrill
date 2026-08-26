import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.canCompleteCircuit !== "function") throw new Error("__signature_mismatch__");
  return [
    ["canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])", show(3), show(solution.canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]))],
    ["canCompleteCircuit([2, 3, 4], [3, 4, 3])", show(-1), show(solution.canCompleteCircuit([2, 3, 4], [3, 4, 3]))],
    ["canCompleteCircuit([5], [4])", show(0), show(solution.canCompleteCircuit([5], [4]))],
    ["canCompleteCircuit([1, 2], [2, 1])", show(1), show(solution.canCompleteCircuit([1, 2], [2, 1]))],
    ["canCompleteCircuit([], [])", show(-1), show(solution.canCompleteCircuit([], []))],
    ["canCompleteCircuit([3, 1, 1], [1, 2, 2])", show(0), show(solution.canCompleteCircuit([3, 1, 1], [1, 2, 2]))],
  ];
}

import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.rob !== "function") throw new Error("__signature_mismatch__");
  return [
    ["rob([1, 2, 3, 1])", show(4), show(solution.rob([1, 2, 3, 1]))],
    ["rob([2, 7, 9, 3, 1])", show(12), show(solution.rob([2, 7, 9, 3, 1]))],
    ["rob([5])", show(5), show(solution.rob([5]))],
    ["rob([])", show(0), show(solution.rob([]))],
    ["rob([2, 1, 1, 2])", show(4), show(solution.rob([2, 1, 1, 2]))],
    ["rob([1, 2])", show(2), show(solution.rob([1, 2]))],
  ];
}

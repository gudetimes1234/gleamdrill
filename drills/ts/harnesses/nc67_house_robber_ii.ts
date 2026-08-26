import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.rob !== "function") throw new Error("__signature_mismatch__");
  return [
    ["rob([2, 3, 2])", show(3), show(solution.rob([2, 3, 2]))],
    ["rob([1, 2, 3, 1])", show(4), show(solution.rob([1, 2, 3, 1]))],
    ["rob([1, 2, 3])", show(3), show(solution.rob([1, 2, 3]))],
    ["rob([1])", show(1), show(solution.rob([1]))],
    ["rob([])", show(0), show(solution.rob([]))],
    ["rob([1, 2])", show(2), show(solution.rob([1, 2]))],
  ];
}

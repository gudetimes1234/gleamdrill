import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.change !== "function") throw new Error("__signature_mismatch__");
  return [
    ["change(5, [1, 2, 5])", show(4), show(solution.change(5, [1, 2, 5]))],
    ["change(3, [2])", show(0), show(solution.change(3, [2]))],
    ["change(10, [10])", show(1), show(solution.change(10, [10]))],
    ["change(0, [1])", show(1), show(solution.change(0, [1]))],
    ["change(5, [])", show(0), show(solution.change(5, []))],
    ["change(11, [1, 2, 5])", show(11), show(solution.change(11, [1, 2, 5]))],
  ];
}

import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.countBits !== "function") throw new Error("__signature_mismatch__");
  return [
    ["countBits(5)", show([0, 1, 1, 2, 1, 2]), show(solution.countBits(5))],
    ["countBits(2)", show([0, 1, 1]), show(solution.countBits(2))],
    ["countBits(0)", show([0]), show(solution.countBits(0))],
    ["countBits(8)", show([0, 1, 1, 2, 1, 2, 2, 3, 1]), show(solution.countBits(8))],
  ];
}

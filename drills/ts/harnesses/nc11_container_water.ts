import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.maxArea !== "function") throw new Error("__signature_mismatch__");
  return [
    ["maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])", show(49), show(solution.maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))],
    ["maxArea([1, 1])", show(1), show(solution.maxArea([1, 1]))],
  ];
}

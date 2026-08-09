import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.containsDuplicate !== "function") throw new Error("__signature_mismatch__");
  return [
    ["containsDuplicate([1, 2, 3, 1])", show(true), show(solution.containsDuplicate([1, 2, 3, 1]))],
    ["containsDuplicate([1, 2, 3, 4])", show(false), show(solution.containsDuplicate([1, 2, 3, 4]))],
    ["containsDuplicate([])", show(false), show(solution.containsDuplicate([]))],
  ];
}

import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.findDuplicate !== "function") throw new Error("__signature_mismatch__");
  return [
    ["findDuplicate([1,3,4,2,2])", show(2), show(solution.findDuplicate([1, 3, 4, 2, 2]))],
    ["findDuplicate([3,1,3,4,2])", show(3), show(solution.findDuplicate([3, 1, 3, 4, 2]))],
    ["findDuplicate([1,1])", show(1), show(solution.findDuplicate([1, 1]))],
    ["findDuplicate([2,2,2,2,2]) -- repeated more than twice", show(2), show(solution.findDuplicate([2, 2, 2, 2, 2]))],
    ["findDuplicate([1,4,4,2,4])", show(4), show(solution.findDuplicate([1, 4, 4, 2, 4]))],
  ];
}

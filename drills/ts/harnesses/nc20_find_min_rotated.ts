import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.findMin !== "function") throw new Error("__signature_mismatch__");
  return [
    ["findMin([3, 4, 5, 1, 2])", show(1), show(solution.findMin([3, 4, 5, 1, 2]))],
    ["findMin([4, 5, 6, 7, 0, 1, 2])", show(0), show(solution.findMin([4, 5, 6, 7, 0, 1, 2]))],
    ["findMin([11, 13, 15, 17])", show(11), show(solution.findMin([11, 13, 15, 17]))],
    ["findMin([2, 1])", show(1), show(solution.findMin([2, 1]))],
  ];
}

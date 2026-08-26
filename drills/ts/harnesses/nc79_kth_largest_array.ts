import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.findKthLargest !== "function") throw new Error("__signature_mismatch__");
  return [
    ["findKthLargest([3, 2, 1, 5, 6, 4], 2)", show(5), show(solution.findKthLargest([3, 2, 1, 5, 6, 4], 2))],
    ["findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)", show(4), show(solution.findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4))],
    ["findKthLargest([1], 1)", show(1), show(solution.findKthLargest([1], 1))],
    ["findKthLargest([2, 1], 2)", show(1), show(solution.findKthLargest([2, 1], 2))],
    ["findKthLargest([7, 6, 5, 4, 3, 2, 1], 3)", show(5), show(solution.findKthLargest([7, 6, 5, 4, 3, 2, 1], 3))],
    ["findKthLargest([], 1)", show(null), show(solution.findKthLargest([], 1))],
  ];
}

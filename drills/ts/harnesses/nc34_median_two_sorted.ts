import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.findMedianSortedArrays !== "function") throw new Error("__signature_mismatch__");
  return [
    ["findMedianSortedArrays([1, 3], [2])", show(2), show(solution.findMedianSortedArrays([1, 3], [2]))],
    ["findMedianSortedArrays([1, 2], [3, 4])", show(2.5), show(solution.findMedianSortedArrays([1, 2], [3, 4]))],
    ["findMedianSortedArrays([], [1])", show(1), show(solution.findMedianSortedArrays([], [1]))],
    ["findMedianSortedArrays([2], [])", show(2), show(solution.findMedianSortedArrays([2], []))],
    ["findMedianSortedArrays([], [])", show(0), show(solution.findMedianSortedArrays([], []))],
    ["findMedianSortedArrays([1, 2], [])", show(1.5), show(solution.findMedianSortedArrays([1, 2], []))],
    ["findMedianSortedArrays([1, 3, 5, 7], [2, 4, 6])", show(4), show(solution.findMedianSortedArrays([1, 3, 5, 7], [2, 4, 6]))],
  ];
}

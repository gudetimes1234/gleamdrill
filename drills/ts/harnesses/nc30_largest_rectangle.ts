import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.largestRectangleArea !== "function") throw new Error("__signature_mismatch__");
  return [
    ["largestRectangleArea([2, 1, 5, 6, 2, 3])", show(10), show(solution.largestRectangleArea([2, 1, 5, 6, 2, 3]))],
    ["largestRectangleArea([2, 4])", show(4), show(solution.largestRectangleArea([2, 4]))],
    ["largestRectangleArea([])", show(0), show(solution.largestRectangleArea([]))],
    ["largestRectangleArea([1, 1, 1])", show(3), show(solution.largestRectangleArea([1, 1, 1]))],
    ["largestRectangleArea([5])", show(5), show(solution.largestRectangleArea([5]))],
    ["largestRectangleArea([4, 2, 0, 3, 2, 5])", show(6), show(solution.largestRectangleArea([4, 2, 0, 3, 2, 5]))],
  ];
}

import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.maxSlidingWindow !== "function") throw new Error("__signature_mismatch__");
  return [
    ["maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)", show([3, 3, 5, 5, 6, 7]), show(solution.maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))],
    ["maxSlidingWindow([1], 1)", show([1]), show(solution.maxSlidingWindow([1], 1))],
    ["maxSlidingWindow([], 3)", show([]), show(solution.maxSlidingWindow([], 3))],
    ["maxSlidingWindow([9, 8, 7, 6], 2)", show([9, 8, 7]), show(solution.maxSlidingWindow([9, 8, 7, 6], 2))],
    ["maxSlidingWindow([1, -1], 1)", show([1, -1]), show(solution.maxSlidingWindow([1, -1], 1))],
    ["maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4)", show([7, 7, 7, 7, 7]), show(solution.maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4))],
  ];
}

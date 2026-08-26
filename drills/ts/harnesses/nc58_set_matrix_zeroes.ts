import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.setZeroes !== "function") throw new Error("__signature_mismatch__");
  return [
    ["setZeroes([[1, 1, 1], [1, 0, 1], [1, 1, 1]])", show([[1, 0, 1], [0, 0, 0], [1, 0, 1]]), show(solution.setZeroes([[1, 1, 1], [1, 0, 1], [1, 1, 1]]))],
    ["setZeroes([[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]])", show([[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]), show(solution.setZeroes([[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]))],
    ["setZeroes([[1]])", show([[1]]), show(solution.setZeroes([[1]]))],
    ["setZeroes([[0]])", show([[0]]), show(solution.setZeroes([[0]]))],
    ["setZeroes([])", show([]), show(solution.setZeroes([]))],
    ["setZeroes([[1, 2], [3, 4]])", show([[1, 2], [3, 4]]), show(solution.setZeroes([[1, 2], [3, 4]]))],
  ];
}

import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.merge !== "function") throw new Error("__signature_mismatch__");
  return [
    ["merge([[1, 3], [2, 6], [8, 10], [15, 18]])", show([[1, 6], [8, 10], [15, 18]]), show(solution.merge([[1, 3], [2, 6], [8, 10], [15, 18]]))],
    ["merge([[1, 4], [4, 5]])", show([[1, 5]]), show(solution.merge([[1, 4], [4, 5]]))],
    ["merge([])", show([]), show(solution.merge([]))],
    ["merge([[1, 4], [0, 4]])", show([[0, 4]]), show(solution.merge([[1, 4], [0, 4]]))],
    ["merge([[1, 4], [2, 3]])", show([[1, 4]]), show(solution.merge([[1, 4], [2, 3]]))],
  ];
}

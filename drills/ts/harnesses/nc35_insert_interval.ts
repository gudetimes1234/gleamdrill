import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.insert !== "function") throw new Error("__signature_mismatch__");
  return [
    ["insert([[1, 3], [6, 9]], [2, 5])", show([[1, 5], [6, 9]]), show(solution.insert([[1, 3], [6, 9]], [2, 5]))],
    ["insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8])", show([[1, 2], [3, 10], [12, 16]]), show(solution.insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]))],
    ["insert([], [5, 7])", show([[5, 7]]), show(solution.insert([], [5, 7]))],
    ["insert([[1, 5]], [2, 3])", show([[1, 5]]), show(solution.insert([[1, 5]], [2, 3]))],
    ["insert([[1, 5]], [6, 8])", show([[1, 5], [6, 8]]), show(solution.insert([[1, 5]], [6, 8]))],
    ["insert([[3, 5]], [1, 2])", show([[1, 2], [3, 5]]), show(solution.insert([[3, 5]], [1, 2]))],
  ];
}

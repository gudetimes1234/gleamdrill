import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.longestIncreasingPath !== "function") throw new Error("__signature_mismatch__");
  return [
    ["longestIncreasingPath([[9, 9, 4], [6, 6, 8], [2, 1, 1]])", show(4), show(solution.longestIncreasingPath([[9, 9, 4], [6, 6, 8], [2, 1, 1]]))],
    ["longestIncreasingPath([[3, 4, 5], [3, 2, 6], [2, 2, 1]])", show(4), show(solution.longestIncreasingPath([[3, 4, 5], [3, 2, 6], [2, 2, 1]]))],
    ["longestIncreasingPath([[1]])", show(1), show(solution.longestIncreasingPath([[1]]))],
    ["longestIncreasingPath([])", show(0), show(solution.longestIncreasingPath([]))],
    ["longestIncreasingPath([[1, 2], [3, 4]])", show(3), show(solution.longestIncreasingPath([[1, 2], [3, 4]]))],
  ];
}

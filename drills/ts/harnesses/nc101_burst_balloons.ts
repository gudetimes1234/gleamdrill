import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.maxCoins !== "function") throw new Error("__signature_mismatch__");
  return [
    ["maxCoins([3, 1, 5, 8])", show(167), show(solution.maxCoins([3, 1, 5, 8]))],
    ["maxCoins([1, 5])", show(10), show(solution.maxCoins([1, 5]))],
    ["maxCoins([])", show(0), show(solution.maxCoins([]))],
    ["maxCoins([5])", show(5), show(solution.maxCoins([5]))],
    ["maxCoins([1, 2, 3, 4])", show(40), show(solution.maxCoins([1, 2, 3, 4]))],
  ];
}

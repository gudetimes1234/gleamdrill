import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.findCheapestPrice !== "function") throw new Error("__signature_mismatch__");
  return [
    ["findCheapestPrice(4, the loop example, 0, 3, 1)", show(700), show(solution.findCheapestPrice(4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 1))],
    ["findCheapestPrice(3, two hops allowed, 0, 2, 1)", show(200), show(solution.findCheapestPrice(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1))],
    ["findCheapestPrice(3, no stop allowed, 0, 2, 0)", show(500), show(solution.findCheapestPrice(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 0))],
    ["findCheapestPrice(2, no flights at all, 0, 1, 5)", show(-1), show(solution.findCheapestPrice(2, [], 0, 1, 5))],
    ["findCheapestPrice(1, already there, 0, 0, 0)", show(0), show(solution.findCheapestPrice(1, [], 0, 0, 0))],
    ["findCheapestPrice(5, cheapest route needs the third hop, 0, 2, 2)", show(7), show(solution.findCheapestPrice(5, [[0, 1, 5], [1, 2, 5], [0, 3, 2], [3, 1, 2], [1, 4, 1], [4, 2, 1]], 0, 2, 2))],
  ];
}

import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.isNStraightHand !== "function") throw new Error("__signature_mismatch__");
  return [
    ["isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3)", show(true), show(solution.isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3))],
    ["isNStraightHand([1, 2, 3, 4, 5], 4)", show(false), show(solution.isNStraightHand([1, 2, 3, 4, 5], 4))],
    ["isNStraightHand([1, 2, 3, 4, 5, 6], 2)", show(true), show(solution.isNStraightHand([1, 2, 3, 4, 5, 6], 2))],
    ["isNStraightHand([], 1)", show(true), show(solution.isNStraightHand([], 1))],
    ["isNStraightHand([1, 1, 2, 2, 3, 3], 3)", show(true), show(solution.isNStraightHand([1, 1, 2, 2, 3, 3], 3))],
    ["isNStraightHand([8, 10, 12], 3)", show(false), show(solution.isNStraightHand([8, 10, 12], 3))],
  ];
}

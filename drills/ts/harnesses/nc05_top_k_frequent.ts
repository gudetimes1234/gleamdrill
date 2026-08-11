import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.topKFrequent !== "function") throw new Error("__signature_mismatch__");
  return [
    ["topKFrequent([1, 1, 1, 2, 2, 3], 2)", show([1, 2]), show(solution.topKFrequent([1, 1, 1, 2, 2, 3], 2))],
    ["topKFrequent([1], 1)", show([1]), show(solution.topKFrequent([1], 1))],
    ["topKFrequent([5, 5, 4, 4, 4, 3], 1)", show([4]), show(solution.topKFrequent([5, 5, 4, 4, 4, 3], 1))],
  ];
}

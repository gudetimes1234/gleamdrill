import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.minDistance !== "function") throw new Error("__signature_mismatch__");
  return [
    ["minDistance('horse', 'ros')", show(3), show(solution.minDistance('horse', 'ros'))],
    ["minDistance('intention', 'execution')", show(5), show(solution.minDistance('intention', 'execution'))],
    ["minDistance('', 'abc')", show(3), show(solution.minDistance('', 'abc'))],
    ["minDistance('abc', '')", show(3), show(solution.minDistance('abc', ''))],
    ["minDistance('abc', 'abc')", show(0), show(solution.minDistance('abc', 'abc'))],
    ["minDistance('kitten', 'sitting')", show(3), show(solution.minDistance('kitten', 'sitting'))],
  ];
}

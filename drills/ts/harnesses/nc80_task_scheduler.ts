import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.leastInterval !== "function") throw new Error("__signature_mismatch__");
  return [
    ["leastInterval(['A','A','A','B','B','B'], 2)", show(8), show(solution.leastInterval(["A", "A", "A", "B", "B", "B"], 2))],
    ["leastInterval(['A','A','A','B','B','B'], 0)", show(6), show(solution.leastInterval(["A", "A", "A", "B", "B", "B"], 0))],
    ["leastInterval(['A','A','A','B','B','B'], 3)", show(10), show(solution.leastInterval(["A", "A", "A", "B", "B", "B"], 3))],
    ["leastInterval([], 2)", show(0), show(solution.leastInterval([], 2))],
    ["leastInterval(['A'], 5)", show(1), show(solution.leastInterval(["A"], 5))],
    ["leastInterval(four As and six singles, 2)", show(10), show(solution.leastInterval(["A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2))],
  ];
}

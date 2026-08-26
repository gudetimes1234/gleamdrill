import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.myPow !== "function") throw new Error("__signature_mismatch__");
  return [
    ["myPow(2.0, 10)", show(1024), show(solution.myPow(2.0, 10))],
    ["myPow(2.0, -2)", show(0.25), show(solution.myPow(2.0, -2))],
    ["myPow(2.0, 0)", show(1), show(solution.myPow(2.0, 0))],
    ["myPow(0.5, 3)", show(0.125), show(solution.myPow(0.5, 3))],
    ["myPow(-2.0, 3)", show(-8), show(solution.myPow(-2.0, 3))],
    ["myPow(2.0, 1)", show(2), show(solution.myPow(2.0, 1))],
    ["myPow(0.0, 5)", show(0), show(solution.myPow(0.0, 5))],
  ];
}

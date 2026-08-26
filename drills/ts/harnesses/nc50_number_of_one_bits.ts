import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.hammingWeight !== "function") throw new Error("__signature_mismatch__");
  return [
    ["hammingWeight(11)", show(3), show(solution.hammingWeight(11))],
    ["hammingWeight(128)", show(1), show(solution.hammingWeight(128))],
    ["hammingWeight(0)", show(0), show(solution.hammingWeight(0))],
    ["hammingWeight(2147483645)", show(30), show(solution.hammingWeight(2147483645))],
    ["hammingWeight(1)", show(1), show(solution.hammingWeight(1))],
  ];
}

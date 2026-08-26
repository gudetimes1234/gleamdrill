import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.isHappy !== "function") throw new Error("__signature_mismatch__");
  return [
    ["isHappy(19)", show(true), show(solution.isHappy(19))],
    ["isHappy(2)", show(false), show(solution.isHappy(2))],
    ["isHappy(1)", show(true), show(solution.isHappy(1))],
    ["isHappy(7)", show(true), show(solution.isHappy(7))],
    ["isHappy(4)", show(false), show(solution.isHappy(4))],
    ["isHappy(100)", show(true), show(solution.isHappy(100))],
  ];
}

import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.countSubstrings !== "function") throw new Error("__signature_mismatch__");
  return [
    ["countSubstrings('abc')", show(3), show(solution.countSubstrings('abc'))],
    ["countSubstrings('aaa')", show(6), show(solution.countSubstrings('aaa'))],
    ["countSubstrings('')", show(0), show(solution.countSubstrings(''))],
    ["countSubstrings('a')", show(1), show(solution.countSubstrings('a'))],
    ["countSubstrings('aba')", show(4), show(solution.countSubstrings('aba'))],
    ["countSubstrings('abccba')", show(9), show(solution.countSubstrings('abccba'))],
  ];
}

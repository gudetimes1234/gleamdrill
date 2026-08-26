import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.isMatch !== "function") throw new Error("__signature_mismatch__");
  return [
    ["isMatch('aa', 'a')", show(false), show(solution.isMatch('aa', 'a'))],
    ["isMatch('aa', 'a*')", show(true), show(solution.isMatch('aa', 'a*'))],
    ["isMatch('ab', '.*')", show(true), show(solution.isMatch('ab', '.*'))],
    ["isMatch('aab', 'c*a*b')", show(true), show(solution.isMatch('aab', 'c*a*b'))],
    ["isMatch('mississippi', 'mis*is*p*.')", show(false), show(solution.isMatch('mississippi', 'mis*is*p*.'))],
    ["isMatch('', '.*')", show(true), show(solution.isMatch('', '.*'))],
    ["isMatch('', '')", show(true), show(solution.isMatch('', ''))],
    ["isMatch('abc', 'abc')", show(true), show(solution.isMatch('abc', 'abc'))],
  ];
}

import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.minWindow !== "function") throw new Error("__signature_mismatch__");
  return [
    ["minWindow('ADOBECODEBANC', 'ABC')", show("BANC"), show(solution.minWindow("ADOBECODEBANC", "ABC"))],
    ["minWindow('a', 'a')", show("a"), show(solution.minWindow("a", "a"))],
    ["minWindow('a', 'aa')", show(""), show(solution.minWindow("a", "aa"))],
    ["minWindow('', 'a')", show(""), show(solution.minWindow("", "a"))],
    ["minWindow('ab', '')", show(""), show(solution.minWindow("ab", ""))],
    ["minWindow('aaflslflsldkalskaaa', 'aaa')", show("aaa"), show(solution.minWindow("aaflslflsldkalskaaa", "aaa"))],
  ];
}

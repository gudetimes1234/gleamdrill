import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.longestCommonSubsequence !== "function") throw new Error("__signature_mismatch__");
  return [
    ["longestCommonSubsequence('abcde', 'ace')", show(3), show(solution.longestCommonSubsequence('abcde', 'ace'))],
    ["longestCommonSubsequence('abc', 'abc')", show(3), show(solution.longestCommonSubsequence('abc', 'abc'))],
    ["longestCommonSubsequence('abc', 'def')", show(0), show(solution.longestCommonSubsequence('abc', 'def'))],
    ["longestCommonSubsequence('', 'abc')", show(0), show(solution.longestCommonSubsequence('', 'abc'))],
    ["longestCommonSubsequence('bsbininm', 'jmjkbkjkv')", show(1), show(solution.longestCommonSubsequence('bsbininm', 'jmjkbkjkv'))],
    ["longestCommonSubsequence('ezupkr', 'ubmrapg')", show(2), show(solution.longestCommonSubsequence('ezupkr', 'ubmrapg'))],
  ];
}

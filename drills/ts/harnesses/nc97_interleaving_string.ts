import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.isInterleave !== "function") throw new Error("__signature_mismatch__");
  return [
    ["isInterleave('aabcc', 'dbbca', 'aadbbcbcac')", show(true), show(solution.isInterleave('aabcc', 'dbbca', 'aadbbcbcac'))],
    ["isInterleave('aabcc', 'dbbca', 'aadbbbaccc')", show(false), show(solution.isInterleave('aabcc', 'dbbca', 'aadbbbaccc'))],
    ["isInterleave('', '', '')", show(true), show(solution.isInterleave('', '', ''))],
    ["isInterleave('a', '', 'a')", show(true), show(solution.isInterleave('a', '', 'a'))],
    ["isInterleave('', 'b', 'b')", show(true), show(solution.isInterleave('', 'b', 'b'))],
    ["isInterleave('abc', 'def', 'adbecf')", show(true), show(solution.isInterleave('abc', 'def', 'adbecf'))],
  ];
}

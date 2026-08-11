import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.lengthOfLongestSubstring !== "function") throw new Error("__signature_mismatch__");
  return [
    ["lengthOfLongestSubstring('abcabcbb')", show(3), show(solution.lengthOfLongestSubstring("abcabcbb"))],
    ["lengthOfLongestSubstring('bbbbb')", show(1), show(solution.lengthOfLongestSubstring("bbbbb"))],
    ["lengthOfLongestSubstring('pwwkew')", show(3), show(solution.lengthOfLongestSubstring("pwwkew"))],
    ["lengthOfLongestSubstring('')", show(0), show(solution.lengthOfLongestSubstring(""))],
  ];
}

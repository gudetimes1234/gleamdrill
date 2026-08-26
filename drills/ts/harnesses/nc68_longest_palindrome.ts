import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.longestPalindrome !== "function") throw new Error("__signature_mismatch__");
  return [
    ["longestPalindrome('cbbd')", show('bb'), show(solution.longestPalindrome('cbbd'))],
    ["longestPalindrome('a')", show('a'), show(solution.longestPalindrome('a'))],
    ["longestPalindrome('')", show(''), show(solution.longestPalindrome(''))],
    ["longestPalindrome('forgeeksskeegfor')", show('geeksskeeg'), show(solution.longestPalindrome('forgeeksskeegfor'))],
    ["longestPalindrome('aaaa')", show('aaaa'), show(solution.longestPalindrome('aaaa'))],
    ["longestPalindrome('racecar')", show('racecar'), show(solution.longestPalindrome('racecar'))],
    ["longestPalindrome('abb')", show('bb'), show(solution.longestPalindrome('abb'))],
  ];
}

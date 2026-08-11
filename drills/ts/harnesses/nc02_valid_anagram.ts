import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.isAnagram !== "function") throw new Error("__signature_mismatch__");
  return [
    ["isAnagram('anagram', 'nagaram')", show(true), show(solution.isAnagram("anagram", "nagaram"))],
    ["isAnagram('rat', 'car')", show(false), show(solution.isAnagram("rat", "car"))],
    ["isAnagram('', '')", show(true), show(solution.isAnagram("", ""))],
    ["isAnagram('a', 'ab')", show(false), show(solution.isAnagram("a", "ab"))],
  ];
}

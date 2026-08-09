import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.isPalindrome !== "function") throw new Error("__signature_mismatch__");
  return [
    ["isPalindrome('A man, a plan, a canal: Panama')", show(true), show(solution.isPalindrome("A man, a plan, a canal: Panama"))],
    ["isPalindrome('race a car')", show(false), show(solution.isPalindrome("race a car"))],
    ["isPalindrome(' ')", show(true), show(solution.isPalindrome(" "))],
    ["isPalindrome('0P')", show(false), show(solution.isPalindrome("0P"))],
  ];
}

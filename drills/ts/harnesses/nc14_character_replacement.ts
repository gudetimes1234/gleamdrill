import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.characterReplacement !== "function") throw new Error("__signature_mismatch__");
  return [
    ["characterReplacement('ABAB', 2)", show(4), show(solution.characterReplacement("ABAB", 2))],
    ["characterReplacement('AABABBA', 1)", show(4), show(solution.characterReplacement("AABABBA", 1))],
    ["characterReplacement('AAAA', 0)", show(4), show(solution.characterReplacement("AAAA", 0))],
  ];
}

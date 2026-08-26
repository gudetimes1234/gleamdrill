import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

const sorted = (digits: string) => [...solution.letterCombinations(digits)].sort();

export function run(): [string, string, string][] {
  if (typeof solution.letterCombinations !== "function") throw new Error("__signature_mismatch__");
  return [
    ["letterCombinations('23')", show(["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]), show(sorted("23"))],
    ["letterCombinations('')", show([]), show(sorted(""))],
    ["letterCombinations('2')", show(["a", "b", "c"]), show(sorted("2"))],
    ["letterCombinations('9')", show(["w", "x", "y", "z"]), show(sorted("9"))],
    ["letterCombinations('79') count", show(16), show(solution.letterCombinations("79").length)],
  ];
}

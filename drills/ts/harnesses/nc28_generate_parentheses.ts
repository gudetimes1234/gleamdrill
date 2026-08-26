import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

// Any order is acceptable, so every case compares sorted.
const sorted = (n: number) => [...solution.generateParenthesis(n)].sort();

export function run(): [string, string, string][] {
  if (typeof solution.generateParenthesis !== "function") throw new Error("__signature_mismatch__");
  return [
    ["generateParenthesis(1)", show(["()"]), show(sorted(1))],
    ["generateParenthesis(2)", show(["(())", "()()"]), show(sorted(2))],
    ["generateParenthesis(3)", show(["((()))", "(()())", "(())()", "()(())", "()()()"]), show(sorted(3))],
    ["generateParenthesis(4) count", show(14), show(sorted(4).length)],
  ];
}

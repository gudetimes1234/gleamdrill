import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.isValid !== "function") throw new Error("__signature_mismatch__");
  return [
    ["isValid('()[]{}')", show(true), show(solution.isValid("()[]{}"))],
    ["isValid('(]')", show(false), show(solution.isValid("(]"))],
    ["isValid('([)]')", show(false), show(solution.isValid("([)]"))],
    ["isValid('{[]}')", show(true), show(solution.isValid("{[]}"))],
    ["isValid('(')", show(false), show(solution.isValid("("))],
  ];
}

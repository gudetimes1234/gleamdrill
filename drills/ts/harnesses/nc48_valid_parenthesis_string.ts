import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.checkValidString !== "function") throw new Error("__signature_mismatch__");
  return [
    ["checkValidString('()')", show(true), show(solution.checkValidString('()'))],
    ["checkValidString('(*)')", show(true), show(solution.checkValidString('(*)'))],
    ["checkValidString('(*))')", show(true), show(solution.checkValidString('(*))'))],
    ["checkValidString(')(')", show(false), show(solution.checkValidString(')('))],
    ["checkValidString('')", show(true), show(solution.checkValidString(''))],
    ["checkValidString('*')", show(true), show(solution.checkValidString('*'))],
    ["checkValidString(')*')", show(false), show(solution.checkValidString(')*'))],
    ["checkValidString('(*()')", show(true), show(solution.checkValidString('(*()'))],
  ];
}

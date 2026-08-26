import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.multiply !== "function") throw new Error("__signature_mismatch__");
  return [
    ["multiply('2', '3')", show('6'), show(solution.multiply('2', '3'))],
    ["multiply('123', '456')", show('56088'), show(solution.multiply('123', '456'))],
    ["multiply('0', '52')", show('0'), show(solution.multiply('0', '52'))],
    ["multiply('9', '9')", show('81'), show(solution.multiply('9', '9'))],
    ["multiply('999', '999')", show('998001'), show(solution.multiply('999', '999'))],
    ["multiply('123456789', '987654321')", show('121932631112635269'), show(solution.multiply('123456789', '987654321'))],
  ];
}

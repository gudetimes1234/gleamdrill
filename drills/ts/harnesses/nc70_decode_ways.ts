import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.numDecodings !== "function") throw new Error("__signature_mismatch__");
  return [
    ["numDecodings('12')", show(2), show(solution.numDecodings('12'))],
    ["numDecodings('226')", show(3), show(solution.numDecodings('226'))],
    ["numDecodings('06')", show(0), show(solution.numDecodings('06'))],
    ["numDecodings('0')", show(0), show(solution.numDecodings('0'))],
    ["numDecodings('')", show(0), show(solution.numDecodings(''))],
    ["numDecodings('10')", show(1), show(solution.numDecodings('10'))],
    ["numDecodings('2101')", show(1), show(solution.numDecodings('2101'))],
    ["numDecodings('11106')", show(2), show(solution.numDecodings('11106'))],
  ];
}

import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.checkInclusion !== "function") throw new Error("__signature_mismatch__");
  return [
    ["checkInclusion('ab', 'eidbaooo')", show(true), show(solution.checkInclusion("ab", "eidbaooo"))],
    ["checkInclusion('ab', 'eidboaoo')", show(false), show(solution.checkInclusion("ab", "eidboaoo"))],
    ["checkInclusion('adc', 'dcda')", show(true), show(solution.checkInclusion("adc", "dcda"))],
  ];
}

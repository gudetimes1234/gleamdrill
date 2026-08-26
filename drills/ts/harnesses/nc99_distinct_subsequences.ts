import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.numDistinct !== "function") throw new Error("__signature_mismatch__");
  return [
    ["numDistinct('rabbbit', 'rabbit')", show(3), show(solution.numDistinct('rabbbit', 'rabbit'))],
    ["numDistinct('babgbag', 'bag')", show(5), show(solution.numDistinct('babgbag', 'bag'))],
    ["numDistinct('', 'a')", show(0), show(solution.numDistinct('', 'a'))],
    ["numDistinct('a', '')", show(1), show(solution.numDistinct('a', ''))],
    ["numDistinct('abc', 'abc')", show(1), show(solution.numDistinct('abc', 'abc'))],
    ["numDistinct('aaa', 'aa')", show(3), show(solution.numDistinct('aaa', 'aa'))],
  ];
}

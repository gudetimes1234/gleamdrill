import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.partitionLabels !== "function") throw new Error("__signature_mismatch__");
  return [
    ["partitionLabels('ababcbacadefegdehijhklij')", show([9, 7, 8]), show(solution.partitionLabels('ababcbacadefegdehijhklij'))],
    ["partitionLabels('eccbbbbdec')", show([10]), show(solution.partitionLabels('eccbbbbdec'))],
    ["partitionLabels('a')", show([1]), show(solution.partitionLabels('a'))],
    ["partitionLabels('')", show([]), show(solution.partitionLabels(''))],
    ["partitionLabels('abc')", show([1, 1, 1]), show(solution.partitionLabels('abc'))],
  ];
}

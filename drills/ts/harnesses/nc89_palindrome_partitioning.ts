import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

// The order of pieces within a partition is the answer, so only the outer list
// is normalised. Comma rather than a pipe: a pipe sorts after letters.
const sorted = (s: string) => solution.partition(s).map((pieces) => pieces.join(",")).sort();

export function run(): [string, string, string][] {
  if (typeof solution.partition !== "function") throw new Error("__signature_mismatch__");
  return [
    ["partition('aab')", show(["a,a,b", "aa,b"]), show(sorted("aab"))],
    ["partition('a')", show(["a"]), show(sorted("a"))],
    ["partition('')", show([""]), show(sorted(""))],
    ["partition('aba')", show(["a,b,a", "aba"]), show(sorted("aba"))],
    ["partition('abc')", show(["a,b,c"]), show(sorted("abc"))],
  ];
}

import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.WordDictionary !== "function") throw new Error("__signature_mismatch__");

  const d = new solution.WordDictionary();
  for (const word of ["bad", "dad", "mad"]) d.addWord(word);

  return [
    ["search('pad')", show(false), show(d.search("pad"))],
    ["search('bad')", show(true), show(d.search("bad"))],
    ["search('.ad')", show(true), show(d.search(".ad"))],
    ["search('b..')", show(true), show(d.search("b.."))],
    ["search('...')", show(true), show(d.search("..."))],
    ["search('b') -- too short", show(false), show(d.search("b"))],
    ["search('....') -- too long", show(false), show(d.search("...."))],
  ];
}

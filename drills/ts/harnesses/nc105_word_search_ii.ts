import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

const board = () => ["oaan", "etae", "ihkr", "iflv"].map((row) => row.split(""));
const sorted = (b: string[][], words: string[]) => solution.findWords(b, words).sort();

export function run(): [string, string, string][] {
  if (typeof solution.findWords !== "function") throw new Error("__signature_mismatch__");
  return [
    ["findWords(board, ['oath','pea','eat','rain'])", show(["eat", "oath"]), show(sorted(board(), ["oath", "pea", "eat", "rain"]))],
    ["findWords([['a','b'],['c','d']], ['abcb'])", show([]), show(sorted([["a", "b"], ["c", "d"]], ["abcb"]))],
    ["findWords([['a']], ['a'])", show(["a"]), show(sorted([["a"]], ["a"]))],
    ["findWords(board, [])", show([]), show(sorted(board(), []))],
    ["findWords([], ['a'])", show([]), show(sorted([], ["a"]))],
  ];
}

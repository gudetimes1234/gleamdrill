import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.ladderLength !== "function") throw new Error("__signature_mismatch__");
  return [
    ["ladderLength('hit','cog', full list)", show(5), show(solution.ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']))],
    ["ladderLength('hit','cog', without cog)", show(0), show(solution.ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']))],
    ["ladderLength('a','c', ['a','b','c'])", show(2), show(solution.ladderLength('a', 'c', ['a', 'b', 'c']))],
    ["ladderLength('hit','hit', ['hit'])", show(1), show(solution.ladderLength('hit', 'hit', ['hit']))],
    ["ladderLength('hot','dog', ['hot','dog']) -- no bridge", show(0), show(solution.ladderLength('hot', 'dog', ['hot', 'dog']))],
  ];
}

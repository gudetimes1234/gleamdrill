import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.alienOrder !== "function") throw new Error("__signature_mismatch__");
  return [
    ["alienOrder(['wrt','wrf','er','ett','rftt'])", show("wertf"), show(solution.alienOrder(["wrt", "wrf", "er", "ett", "rftt"]))],
    ["alienOrder(['z','x'])", show("zx"), show(solution.alienOrder(["z", "x"]))],
    ["alienOrder(['z','x','z']) -- contradictory", show(""), show(solution.alienOrder(["z", "x", "z"]))],
    ["alienOrder(['abc','ab']) -- a word before its own prefix", show(""), show(solution.alienOrder(["abc", "ab"]))],
    ["alienOrder(['z','z'])", show("z"), show(solution.alienOrder(["z", "z"]))],
    ["alienOrder(['x','y','z'])", show("xyz"), show(solution.alienOrder(["x", "y", "z"]))],
  ];
}

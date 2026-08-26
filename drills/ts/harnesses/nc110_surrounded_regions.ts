import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";
const shown = (rows: string[]) =>
  solution.solve(rows.map((row) => row.split(""))).map((row) => row.join(""));

export function run(): [string, string, string][] {
  if (typeof solution.solve !== "function") throw new Error("__signature_mismatch__");
  return [
    ["solve(the classic 4x4)", show(["XXXX", "XXXX", "XXXX", "XOXX"]), show(shown(["XXXX", "XOOX", "XXOX", "XOXX"]))],
    ["solve([['X']])", show(["X"]), show(shown(["X"]))],
    ["solve([['O']]) -- on the border, so it survives", show(["O"]), show(shown(["O"]))],
    ["solve([])", show([]), show(shown([]))],
    ["solve(a region reaching the border)", show(["XOX", "XOX", "XXX"]), show(shown(["XOX", "XOX", "XXX"]))],
  ];
}

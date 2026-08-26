import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.swimInWater !== "function") throw new Error("__signature_mismatch__");
  return [
    ["swimInWater([[0,2],[1,3]])", show(3), show(solution.swimInWater([[0, 2], [1, 3]]))],
    ["swimInWater(the 5x5 spiral)", show(16), show(solution.swimInWater([[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]))],
    ["swimInWater([[0]])", show(0), show(solution.swimInWater([[0]]))],
    ["swimInWater([[3,2],[1,0]]) -- the start is the deepest cell", show(3), show(solution.swimInWater([[3, 2], [1, 0]]))],
  ];
}

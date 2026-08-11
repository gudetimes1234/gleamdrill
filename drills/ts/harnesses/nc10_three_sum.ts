import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

/** Triples are compared as a set: only their contents are meaningful. */
const normalise = (triples: number[][]) => triples.map((t) => show(t)).sort();

export function run(): [string, string, string][] {
  if (typeof solution.threeSum !== "function") throw new Error("__signature_mismatch__");
  return [
    [
      "threeSum([-1, 0, 1, 2, -1, -4])",
      show(["[-1,-1,2]", "[-1,0,1]"]),
      show(normalise(solution.threeSum([-1, 0, 1, 2, -1, -4]))),
    ],
    ["threeSum([0, 1, 1])", show([]), show(normalise(solution.threeSum([0, 1, 1])))],
    ["threeSum([0, 0, 0])", show(["[0,0,0]"]), show(normalise(solution.threeSum([0, 0, 0])))],
  ];
}

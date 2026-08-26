import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

const stream = (k: number, initial: number[], added: number[]) => {
  const store = new solution.KthLargest(k, initial);
  return added.map((value) => store.add(value));
};

export function run(): [string, string, string][] {
  if (typeof solution.KthLargest !== "function") throw new Error("__signature_mismatch__");
  return [
    ["k = 3 over [4, 5, 8, 2] then 3, 5, 10, 9, 4", show([4, 5, 5, 8, 8]), show(stream(3, [4, 5, 8, 2], [3, 5, 10, 9, 4]))],
    ["k = 1 over [] then 1, 2, 0", show([1, 2, 2]), show(stream(1, [], [1, 2, 0]))],
    ["k = 2 over [] then 5, 5", show([null, 5]), show(stream(2, [], [5, 5]))],
  ];
}

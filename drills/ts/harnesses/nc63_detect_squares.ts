import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.DetectSquares !== "function") throw new Error("__signature_mismatch__");

  const store = new solution.DetectSquares();
  store.add([3, 10]);
  store.add([11, 2]);
  store.add([3, 2]);

  const cases: [string, string, string][] = [
    ["count([11, 10]) with one of each corner", show(1), show(store.count([11, 10]))],
    ["count([14, 8]) -- no square", show(0), show(store.count([14, 8]))],
  ];

  store.add([11, 2]);
  cases.push(["count([11, 10]) after adding [11, 2] twice", show(2), show(store.count([11, 10]))]);
  cases.push(["count on an empty store", show(0), show(new solution.DetectSquares().count([0, 0]))]);

  const unit = new solution.DetectSquares();
  unit.add([0, 1]);
  unit.add([1, 0]);
  unit.add([1, 1]);
  cases.push(["count([0, 0]) on the unit square", show(1), show(unit.count([0, 0]))]);

  return cases;
}

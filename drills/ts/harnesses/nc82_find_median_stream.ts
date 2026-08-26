import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

const medians = (values: number[]) => {
  const finder = new solution.MedianFinder();
  return values.map((value) => {
    finder.addNum(value);
    return finder.findMedian();
  });
};

export function run(): [string, string, string][] {
  if (typeof solution.MedianFinder !== "function") throw new Error("__signature_mismatch__");
  return [
    ["medians of 1, 2, 3", show([1, 1.5, 2]), show(medians([1, 2, 3]))],
    ["medians of 1, 2, 3, 4, 5", show([1, 1.5, 2, 2.5, 3]), show(medians([1, 2, 3, 4, 5]))],
    ["medians arriving out of order", show([5, 3, 2, 2.5]), show(medians([5, 1, 2, 3]))],
    ["medians of negatives", show([-1, -1.5]), show(medians([-1, -2]))],
    ["median before anything is added", show(0), show(new solution.MedianFinder().findMedian())],
  ];
}

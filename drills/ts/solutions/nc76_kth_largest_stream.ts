export class KthLargest {
  private k: number;
  // Only the k largest values can ever be the answer, so everything else is
  // discarded on arrival. A real min-heap makes that O(log k); JavaScript has
  // no heap in the standard library, so this keeps a sorted array instead --
  // same idea, worse constant.
  private largest: number[];

  constructor(k: number, nums: number[]) {
    this.k = k;
    this.largest = [...nums].sort((a, b) => b - a).slice(0, k).sort((a, b) => a - b);
  }

  add(value: number): number | null {
    this.largest = [...this.largest, value]
      .sort((a, b) => b - a)
      .slice(0, this.k)
      .sort((a, b) => a - b);
    return this.largest.length === this.k ? this.largest[0] : null;
  }
}

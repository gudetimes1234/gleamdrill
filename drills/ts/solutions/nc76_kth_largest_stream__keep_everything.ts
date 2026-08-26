export class KthLargest {
  private k: number;
  private seen: number[];

  constructor(k: number, nums: number[]) {
    this.k = k;
    this.seen = [...nums];
  }

  // Keep the whole stream and sort on demand. Wrong for a real stream -- memory
  // grows without bound and every query costs a sort -- but it is the
  // definition, and it is what the bounded structure has to be checked against.
  add(value: number): number | null {
    this.seen.push(value);
    if (this.seen.length < this.k) return null;
    return [...this.seen].sort((a, b) => b - a)[this.k - 1];
  }
}

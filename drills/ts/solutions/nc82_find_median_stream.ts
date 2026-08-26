export class MedianFinder {
  // `lower` is the smaller half, largest first; `upper` is the larger half,
  // smallest first. The median is always at one or both of those two heads.
  // A real pair of heaps makes each insert O(log n); JavaScript has no heap in
  // the standard library, so these are sorted arrays -- same invariant.
  private lower: number[] = [];
  private upper: number[] = [];

  addNum(value: number): void {
    this.lower.push(value);
    this.lower.sort((a, b) => b - a);

    // Nothing in the smaller half may exceed the larger half's smallest, and
    // the smaller half may hold at most one more element than the larger.
    while (this.upper.length && this.lower[0] > this.upper[0]) {
      this.upper.push(this.lower.shift()!);
      this.upper.sort((a, b) => a - b);
    }
    while (this.lower.length > this.upper.length + 1) {
      this.upper.push(this.lower.shift()!);
      this.upper.sort((a, b) => a - b);
    }
    while (this.upper.length > this.lower.length) {
      this.lower.push(this.upper.shift()!);
      this.lower.sort((a, b) => b - a);
    }
  }

  findMedian(): number {
    if (this.lower.length === 0) return 0;
    if (this.lower.length > this.upper.length) return this.lower[0];
    return (this.lower[0] + this.upper[0]) / 2;
  }
}

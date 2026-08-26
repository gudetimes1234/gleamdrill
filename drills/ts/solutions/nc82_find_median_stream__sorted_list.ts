export class MedianFinder {
  private values: number[] = [];

  // One sorted array, kept in order on insertion. Simpler to believe than two
  // halves, and the median is then just a lookup -- at the cost of an O(n)
  // insert where the two-heap version pays O(log n).
  addNum(value: number): void {
    let at = this.values.findIndex((existing) => existing > value);
    if (at === -1) at = this.values.length;
    this.values.splice(at, 0, value);
  }

  findMedian(): number {
    const n = this.values.length;
    if (n === 0) return 0;
    return (this.values[Math.floor(n / 2)] + this.values[Math.floor((n - 1) / 2)]) / 2;
  }
}

export class MinStack {
  private values: number[] = [];
  private minimums: number[] = [];

  push(val: number): void {
    this.values.push(val);
    const smallest = this.minimums.length === 0
      ? val
      : Math.min(val, this.minimums[this.minimums.length - 1]);
    this.minimums.push(smallest);
  }

  pop(): void {
    this.values.pop();
    this.minimums.pop();
  }

  top(): number {
    return this.values[this.values.length - 1];
  }

  getMin(): number {
    return this.minimums[this.minimums.length - 1];
  }
}

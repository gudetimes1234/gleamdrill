export class MinStack {
  private entries: [number, number][] = [];

  push(val: number): void {
    const smallest = this.entries.length === 0
      ? val
      : Math.min(val, this.entries[this.entries.length - 1][1]);
    this.entries.push([val, smallest]);
  }

  pop(): void {
    this.entries.pop();
  }

  top(): number {
    return this.entries[this.entries.length - 1][0];
  }

  getMin(): number {
    return this.entries[this.entries.length - 1][1];
  }
}

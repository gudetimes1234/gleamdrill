export class DetectSquares {
  private counts = new Map<string, number>();

  add(point: number[]): void {
    const key = `${point[0]},${point[1]}`;
    this.counts.set(key, (this.counts.get(key) ?? 0) + 1);
  }

  count(point: number[]): number {
    const [x, y] = point;
    let total = 0;

    // Pick the corner directly above or below instead. That fixes the side
    // length, which leaves two squares to check rather than one -- the
    // remaining corners can be to the left or to the right.
    for (const [key, copies] of this.counts) {
      const [px, py] = key.split(",").map(Number);
      if (px !== x || py === y) continue;
      const side = Math.abs(py - y);
      for (const column of [x + side, x - side]) {
        total += copies * this.at(column, y) * this.at(column, py);
      }
    }

    return total;
  }

  private at(x: number, y: number): number {
    return this.counts.get(`${x},${y}`) ?? 0;
  }
}

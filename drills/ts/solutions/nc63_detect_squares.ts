export class DetectSquares {
  private counts = new Map<string, number>();

  add(point: number[]): void {
    const key = `${point[0]},${point[1]}`;
    this.counts.set(key, (this.counts.get(key) ?? 0) + 1);
  }

  count(point: number[]): number {
    const [x, y] = point;
    let total = 0;

    // Pick the corner diagonally opposite: that one choice fixes the whole
    // square, because the other two corners must be at (x, py) and (px, y). A
    // valid diagonal partner shares neither coordinate and sits on a true
    // diagonal, and duplicates multiply rather than repeat.
    for (const [key, copies] of this.counts) {
      const [px, py] = key.split(",").map(Number);
      if (px === x || py === y || Math.abs(px - x) !== Math.abs(py - y)) continue;
      total += copies * this.at(x, py) * this.at(px, y);
    }

    return total;
  }

  private at(x: number, y: number): number {
    return this.counts.get(`${x},${y}`) ?? 0;
  }
}

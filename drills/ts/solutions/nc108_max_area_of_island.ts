export function maxAreaOfIsland(grid: number[][]): number {
  const land = new Set<string>();
  grid.forEach((row, r) => row.forEach((value, c) => value === 1 && land.add(`${r},${c}`)));

  // The same component search as counting islands, except each search reports
  // how much it covered rather than just that it happened.
  const seen = new Set<string>();
  let best = 0;

  for (const at of land) {
    if (seen.has(at)) continue;
    let area = 0;
    const stack = [at];
    while (stack.length) {
      const key = stack.pop()!;
      if (!land.has(key) || seen.has(key)) continue;
      seen.add(key);
      area++;
      const [r, c] = key.split(",").map(Number);
      stack.push(`${r - 1},${c}`, `${r + 1},${c}`, `${r},${c - 1}`, `${r},${c + 1}`);
    }
    best = Math.max(best, area);
  }

  return best;
}

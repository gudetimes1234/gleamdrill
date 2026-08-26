export function maxAreaOfIsland(grid: number[][]): number {
  const land = new Set<string>();
  grid.forEach((row, r) => row.forEach((value, c) => value === 1 && land.add(`${r},${c}`)));

  // Breadth-first instead. For a component's *size* the traversal order does
  // not matter at all -- either visits every square exactly once -- so the
  // choice is about the machine: a queue keeps the memory proportional to the
  // frontier rather than to the deepest path, which is what saves a long thin
  // island from overflowing the stack.
  const seen = new Set<string>();
  let best = 0;

  for (const at of land) {
    if (seen.has(at)) continue;
    let area = 0;
    const frontier = [at];
    let head = 0;
    while (head < frontier.length) {
      const key = frontier[head++];
      if (!land.has(key) || seen.has(key)) continue;
      seen.add(key);
      area++;
      const [r, c] = key.split(",").map(Number);
      frontier.push(`${r - 1},${c}`, `${r + 1},${c}`, `${r},${c - 1}`, `${r},${c + 1}`);
    }
    best = Math.max(best, area);
  }

  return best;
}

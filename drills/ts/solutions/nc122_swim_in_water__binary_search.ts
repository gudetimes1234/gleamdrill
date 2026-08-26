export function swimInWater(grid: number[][]): number {
  if (grid.length === 0) return 0;

  const n = grid.length;

  const reaches = (limit: number): boolean => {
    // The target has to be passable itself, so its depth is checked before it
    // counts as reached.
    if (grid[0][0] > limit) return false;
    const seen = new Set<string>();
    const stack: [number, number][] = [[0, 0]];
    while (stack.length) {
      const [r, c] = stack.pop()!;
      if (seen.has(`${r},${c}`) || grid[r][c] > limit) continue;
      if (r === n - 1 && c === n - 1) return true;
      seen.add(`${r},${c}`);
      for (const [nr, nc] of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]) {
        if (nr >= 0 && nr < n && nc >= 0 && nc < grid[nr].length) stack.push([nr, nc]);
      }
    }
    return false;
  };

  // Reachability at time t is monotone: once the corner can be reached it stays
  // reachable as the water rises further. That is exactly the shape binary
  // search needs, so the question turns from "what is the cheapest path" into
  // "is it possible yet", answered by a plain flood fill.
  let low = grid[0][0];
  let high = n * n - 1;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (reaches(middle)) high = middle;
    else low = middle + 1;
  }
  return low;
}

export function swimInWater(grid: number[][]): number {
  if (grid.length === 0) return 0;

  const n = grid.length;

  // Dijkstra's, with "cost of a path" redefined from the sum of its steps to
  // the largest step in it -- the water only has to rise once. Everything else
  // about the algorithm is unchanged, which is the point: settle the cheapest
  // reachable cell, and the first time the far corner is settled that cost is
  // the answer.
  const seen = new Set<string>();
  let frontier: [number, number, number][] = [[grid[0][0], 0, 0]];

  while (frontier.length) {
    let best = 0;
    for (let i = 1; i < frontier.length; i++) if (frontier[i][0] < frontier[best][0]) best = i;
    const [cost, r, c] = frontier[best];
    frontier.splice(best, 1);
    if (r === n - 1 && c === n - 1) return cost;
    if (seen.has(`${r},${c}`)) continue;
    seen.add(`${r},${c}`);
    for (const [nr, nc] of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]) {
      if (nr < 0 || nr >= n || nc < 0 || nc >= grid[nr].length) continue;
      if (seen.has(`${nr},${nc}`)) continue;
      frontier.push([Math.max(cost, grid[nr][nc]), nr, nc]);
    }
  }

  return -1;
}

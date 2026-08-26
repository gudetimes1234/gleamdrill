export function orangesRotting(grid: number[][]): number {
  let rotten: [number, number][] = [];
  let fresh = 0;

  grid.forEach((row, r) =>
    row.forEach((value, c) => {
      if (value === 2) rotten.push([r, c]);
      else if (value === 1) fresh++;
    }),
  );

  // Breadth-first from *every* rotten orange at once, which is what makes the
  // level count a time: all the sources start at minute zero together, so each
  // wave of the search is one minute. A separate search per source would give
  // distances from each, and then need combining.
  const seen = new Set(rotten.map(([r, c]) => `${r},${c}`));
  let minutes = 0;

  while (rotten.length && fresh) {
    const following: [number, number][] = [];
    for (const [r, c] of rotten) {
      for (const [nr, nc] of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]) {
        if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) continue;
        if (grid[nr][nc] !== 1 || seen.has(`${nr},${nc}`)) continue;
        seen.add(`${nr},${nc}`);
        fresh--;
        following.push([nr, nc]);
      }
    }
    if (following.length === 0) break;
    rotten = following;
    minutes++;
  }

  return fresh === 0 ? minutes : -1;
}

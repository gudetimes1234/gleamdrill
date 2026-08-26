export function uniquePaths(m: number, n: number): number {
  if (m <= 0 || n <= 0) return 0;

  // Only right and down moves, so the ways to reach a square are the ways to
  // reach the one above plus the one to its left. Rows are filled top to
  // bottom, and only the row above is ever needed -- so one row of counters
  // does for the whole grid.
  const row = new Array<number>(n).fill(1);
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) row[c] += row[c - 1];
  }

  return row[n - 1];
}

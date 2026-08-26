export function longestIncreasingPath(matrix: number[][]): number {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;

  // The same acyclicity used the other way round: process the squares from
  // largest value to smallest, and by the time a square is reached every square
  // it can move to has already been settled. A topological order without ever
  // building the graph -- sorting by value *is* the order.
  const cells: [number, number, number][] = [];
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) cells.push([matrix[r][c], r, c]);
  }
  cells.sort((a, b) => b[0] - a[0]);

  const lengths = new Map<string, number>();
  let best = 0;

  for (const [value, r, c] of cells) {
    let here = 1;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < matrix.length && nc >= 0 && nc < matrix[0].length) {
        if (matrix[nr][nc] > value) here = Math.max(here, 1 + lengths.get(`${nr},${nc}`)!);
      }
    }
    lengths.set(`${r},${c}`, here);
    best = Math.max(best, here);
  }

  return best;
}

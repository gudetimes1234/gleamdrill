export function spiralOrder(matrix: number[][]): number[] {
  // Take the top row, then turn the problem ninety degrees and do it again.
  // Rotating what is left anticlockwise puts the column you would have walked
  // down next along the top, so there is only ever one move to make.
  const out: number[] = [];
  let grid = matrix;
  while (grid.length > 0 && grid[0].length > 0) {
    out.push(...grid[0]);
    const rest = grid.slice(1);
    grid = rest.length === 0 ? [] : rest[0].map((_, c) => rest.map((row) => row[c])).reverse();
  }
  return out;
}

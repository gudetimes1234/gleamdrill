export function rotate(matrix: number[][]): number[][] {
  // Straight from where each element lands: after a clockwise quarter turn the
  // entry at (row, column) came from (n - 1 - column, row). Writing the mapping
  // out once is the surest way not to get the direction backwards.
  const n = matrix.length;
  return Array.from({ length: n }, (_, r) =>
    Array.from({ length: n }, (_, c) => matrix[n - 1 - c][r]),
  );
}

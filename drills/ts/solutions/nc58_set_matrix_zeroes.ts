export function setZeroes(matrix: number[][]): number[][] {
  // Two passes, and they cannot be one: writing a zero as you find it would be
  // indistinguishable from a zero that was already there, and the whole grid
  // would clear. So record which rows and columns are doomed first, then apply.
  const rows = new Set<number>();
  const columns = new Set<number>();
  matrix.forEach((row, r) =>
    row.forEach((value, c) => {
      if (value === 0) {
        rows.add(r);
        columns.add(c);
      }
    }),
  );

  return matrix.map((row, r) =>
    row.map((value, c) => (rows.has(r) || columns.has(c) ? 0 : value)),
  );
}

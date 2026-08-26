export function setZeroes(matrix: number[][]): number[][] {
  if (matrix.length === 0) return [];

  // The condition stated outright: a cell is cleared exactly when its own row
  // holds a zero or its own column does. Nothing is recorded and nothing is
  // ordered, so the two-pass trap cannot arise -- at the cost of rescanning a
  // row and a column for every single cell.
  const columns = matrix[0].map((_, c) => matrix.map((row) => row[c]));
  return matrix.map((row) =>
    row.map((value, c) => (row.includes(0) || columns[c].includes(0) ? 0 : value)),
  );
}

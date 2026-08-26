export function rotate(matrix: number[][]): number[][] {
  // A quarter turn is a reflection through the main diagonal followed by a
  // reflection through the vertical centre line. Two easy operations instead of
  // one four-way element cycle, and neither needs index arithmetic.
  if (matrix.length === 0) return [];
  const transposed = matrix[0].map((_, c) => matrix.map((row) => row[c]));
  return transposed.map((row) => row.reverse());
}

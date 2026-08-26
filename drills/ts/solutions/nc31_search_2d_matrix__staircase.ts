export function searchMatrix(matrix: number[][], target: number): boolean {
  if (matrix.length === 0 || matrix[0].length === 0) return false;

  // From the top-right corner every step is forced: too big and the whole
  // column is too big, so drop it; too small and the whole row is too small, so
  // drop that. O(m + n), and it never uses the fact that rows do not overlap --
  // it works on any matrix sorted along both axes.
  let row = 0;
  let column = matrix[0].length - 1;
  while (row < matrix.length && column >= 0) {
    const value = matrix[row][column];
    if (value === target) return true;
    if (value > target) column--;
    else row++;
  }
  return false;
}

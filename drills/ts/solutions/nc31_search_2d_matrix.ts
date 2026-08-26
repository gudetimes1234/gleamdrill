export function searchMatrix(matrix: number[][], target: number): boolean {
  // The rows are sorted and do not overlap, so the row a value could live in is
  // itself found by halving: compare the target against a row's ends.
  let low = 0;
  let high = matrix.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    const row = matrix[mid];
    if (row[row.length - 1] < target) low = mid + 1;
    else if (row[0] > target) high = mid - 1;
    else return contains(row, target);
  }
  return false;
}

function contains(row: number[], target: number): boolean {
  let low = 0;
  let high = row.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (row[mid] === target) return true;
    if (row[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return false;
}

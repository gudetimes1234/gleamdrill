export function spiralOrder(matrix: number[][]): number[] {
  if (matrix.length === 0) return [];

  // Four boundaries closing in. Each side is walked and then retired, and the
  // two guards below are the ones everybody forgets: on a single remaining row
  // or column the bottom and top edges are the same edge, so walking both would
  // emit it twice.
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;
  const out: number[] = [];

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) out.push(matrix[top][c]);
    for (let r = top + 1; r <= bottom; r++) out.push(matrix[r][right]);
    if (top < bottom) for (let c = right - 1; c >= left; c--) out.push(matrix[bottom][c]);
    if (left < right) for (let r = bottom - 1; r > top; r--) out.push(matrix[r][left]);
    top++;
    bottom--;
    left++;
    right--;
  }

  return out;
}

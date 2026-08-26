export function longestIncreasingPath(matrix: number[][]): number {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;

  const memo = new Map<string, number>();

  // Strictly increasing means the moves can never form a cycle -- the grid is a
  // directed acyclic graph -- so the longest path from each square is
  // well-defined and can simply be cached. Without that guarantee memoisation
  // would be unsound, which is the fact the problem is really testing.
  const longest = (r: number, c: number): number => {
    const key = `${r},${c}`;
    if (!memo.has(key)) {
      let best = 1;
      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < matrix.length && nc >= 0 && nc < matrix[0].length) {
          if (matrix[nr][nc] > matrix[r][c]) best = Math.max(best, 1 + longest(nr, nc));
        }
      }
      memo.set(key, best);
    }
    return memo.get(key)!;
  };

  let best = 0;
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) best = Math.max(best, longest(r, c));
  }
  return best;
}

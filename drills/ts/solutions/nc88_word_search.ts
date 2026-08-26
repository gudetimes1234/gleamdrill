export function exist(board: string[][], word: string): boolean {
  if (word === "") return true;
  if (board.length === 0) return false;

  // Depth-first from every starting square, with the path so far held in a set
  // so a letter is never reused within one attempt. The set is per-path rather
  // than global -- a square rejected on one route must still be available on
  // another, which is the difference between backtracking and plain search.
  const walk = (r: number, c: number, at: number, used: Set<string>): boolean => {
    if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return false;
    if (used.has(`${r},${c}`) || board[r][c] !== word[at]) return false;
    if (at === word.length - 1) return true;

    const next = new Set(used);
    next.add(`${r},${c}`);
    return (
      walk(r - 1, c, at + 1, next) ||
      walk(r + 1, c, at + 1, next) ||
      walk(r, c - 1, at + 1, next) ||
      walk(r, c + 1, at + 1, next)
    );
  };

  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      if (walk(r, c, 0, new Set())) return true;
    }
  }
  return false;
}

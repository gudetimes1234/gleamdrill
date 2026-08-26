export function exist(board: string[][], word: string): boolean {
  if (word === "") return true;
  if (board.length === 0) return false;

  const available = new Map<string, number>();
  for (const row of board) {
    for (const cell of row) available.set(cell, (available.get(cell) ?? 0) + 1);
  }

  // Two cheap checks before any searching. If the board does not hold enough
  // copies of some letter, no search can succeed. And searching from whichever
  // end of the word is rarer on the board starts from fewer squares -- the
  // branching factor at the root is what dominates.
  const needed = new Map<string, number>();
  for (const letter of word) needed.set(letter, (needed.get(letter) ?? 0) + 1);
  for (const [letter, count] of needed) {
    if ((available.get(letter) ?? 0) < count) return false;
  }

  const target =
    (available.get(word[0]) ?? 0) > (available.get(word[word.length - 1]) ?? 0)
      ? [...word].reverse().join("")
      : word;

  const walk = (r: number, c: number, at: number, used: Set<string>): boolean => {
    if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return false;
    if (used.has(`${r},${c}`) || board[r][c] !== target[at]) return false;
    if (at === target.length - 1) return true;

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

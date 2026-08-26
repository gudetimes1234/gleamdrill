export function findWords(board: string[][], words: string[]): string[] {
  if (board.length === 0 || board[0].length === 0) return [];

  // Word Search, once per word. Correct, and it redoes the search for every
  // shared prefix: a hundred words beginning "ab" each re-walk that "ab" from
  // every square. That repetition is exactly what the trie removes.
  const exists = (word: string): boolean => {
    if (word === "") return false;

    const walk = (r: number, c: number, at: number, used: Set<string>): boolean => {
      if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return false;
      if (used.has(`${r},${c}`) || board[r][c] !== word[at]) return false;
      if (at === word.length - 1) return true;
      const next = new Set(used);
      next.add(`${r},${c}`);
      return [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dr, dc]) =>
        walk(r + dr, c + dc, at + 1, next),
      );
    };

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[0].length; c++) {
        if (walk(r, c, 0, new Set())) return true;
      }
    }
    return false;
  };

  return words.filter(exists);
}

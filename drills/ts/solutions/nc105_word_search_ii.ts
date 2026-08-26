type Node = { children: Map<string, Node>; word: string | null };

export function findWords(board: string[][], words: string[]): string[] {
  if (board.length === 0 || board[0].length === 0) return [];

  // One trie of all the words, walked *alongside* the board. Searching for each
  // word separately re-walks every shared prefix once per word; the trie walks
  // each prefix once and abandons a square the moment no word continues that
  // way, which is where nearly all the saving is.
  const root: Node = { children: new Map(), word: null };
  for (const word of words) {
    let node = root;
    for (const letter of word) {
      if (!node.children.has(letter)) node.children.set(letter, { children: new Map(), word: null });
      node = node.children.get(letter)!;
    }
    node.word = word;
  }

  const found = new Set<string>();

  const walk = (r: number, c: number, node: Node, used: Set<string>) => {
    if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return;
    if (used.has(`${r},${c}`)) return;
    const child = node.children.get(board[r][c]);
    if (!child) return;
    if (child.word !== null) found.add(child.word);
    const next = new Set(used);
    next.add(`${r},${c}`);
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) walk(r + dr, c + dc, child, next);
  };

  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) walk(r, c, root, new Set());
  }

  return [...found];
}

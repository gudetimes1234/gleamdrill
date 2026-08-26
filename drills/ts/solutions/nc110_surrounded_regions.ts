export function solve(board: string[][]): string[][] {
  if (board.length === 0 || board[0].length === 0) return board;

  const rows = board.length;
  const columns = board[0].length;

  // Invert the question. "Which regions are surrounded?" needs a search per
  // region and a rule for what counts as escaping; "which regions touch an
  // edge?" is one search from the border, and everything it does not reach is
  // surrounded by definition.
  const safe = new Set<string>();
  const stack: [number, number][] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const onBorder = r === 0 || c === 0 || r === rows - 1 || c === columns - 1;
      if (onBorder && board[r][c] === "O") stack.push([r, c]);
    }
  }

  while (stack.length) {
    const [r, c] = stack.pop()!;
    if (r < 0 || r >= rows || c < 0 || c >= columns) continue;
    if (safe.has(`${r},${c}`) || board[r][c] !== "O") continue;
    safe.add(`${r},${c}`);
    stack.push([r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]);
  }

  return board.map((row, r) =>
    row.map((value, c) => (value === "O" && !safe.has(`${r},${c}`) ? "X" : value)),
  );
}

const INFINITY = 2147483647;

export function wallsAndGates(rooms: number[][]): number[][] {
  if (rooms.length === 0 || rooms[0].length === 0) return rooms;

  const board = rooms.map((row) => [...row]);
  const rows = board.length;
  const columns = board[0].length;

  // One breadth-first search starting from *all* the gates at once, rather than
  // one search per empty room. Because every source begins at distance zero
  // together, the first time a room is reached is by its nearest gate -- the
  // multi-source search does the whole grid in one pass.
  const frontier: [number, number][] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) if (board[r][c] === 0) frontier.push([r, c]);
  }

  let head = 0;
  while (head < frontier.length) {
    const [r, c] = frontier[head++];
    for (const [nr, nc] of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]) {
      if (nr < 0 || nr >= rows || nc < 0 || nc >= columns) continue;
      if (board[nr][nc] !== INFINITY) continue;
      board[nr][nc] = board[r][c] + 1;
      frontier.push([nr, nc]);
    }
  }

  return board;
}

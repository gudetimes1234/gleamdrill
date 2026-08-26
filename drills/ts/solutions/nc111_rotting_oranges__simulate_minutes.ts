export function orangesRotting(grid: number[][]): number {
  let board = grid.map((row) => [...row]);
  let minutes = 0;

  // Rewrite the whole grid once per minute rather than tracking a frontier.
  // Much more work -- every square is examined every minute, not just the ones
  // next to the rot -- but it is the problem statement executed literally, and
  // it makes plain that the answer counts *rounds*, not distances.
  for (;;) {
    const following = board.map((row, r) =>
      row.map((value, c) => {
        if (value !== 1) return value;
        const touched = [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].some(
          ([nr, nc]) =>
            nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length && board[nr][nc] === 2,
        );
        return touched ? 2 : value;
      }),
    );

    if (JSON.stringify(following) === JSON.stringify(board)) {
      // Nothing changed: either everything has rotted or what is left never
      // will.
      return board.some((row) => row.includes(1)) ? -1 : minutes;
    }
    board = following;
    minutes++;
  }
}

export function solveNQueens(n: number): string[][] {
  const boards: string[][] = [];

  // One queen per row, so the only choice is which column. A diagonal is
  // identified by row - column and an anti-diagonal by row + column, which
  // turns "is this square attacked?" into three set lookups -- and lets the
  // search abandon a whole subtree the moment one fails.
  const place = (
    row: number,
    chosen: number[],
    columns: Set<number>,
    diagonals: Set<number>,
    antiDiagonals: Set<number>,
  ) => {
    if (row === n) {
      boards.push(chosen.map((c) => ".".repeat(c) + "Q" + ".".repeat(n - c - 1)));
      return;
    }
    for (let column = 0; column < n; column++) {
      if (columns.has(column) || diagonals.has(row - column) || antiDiagonals.has(row + column)) {
        continue;
      }
      place(
        row + 1,
        [...chosen, column],
        new Set(columns).add(column),
        new Set(diagonals).add(row - column),
        new Set(antiDiagonals).add(row + column),
      );
    }
  };

  place(0, [], new Set(), new Set(), new Set());
  return boards;
}

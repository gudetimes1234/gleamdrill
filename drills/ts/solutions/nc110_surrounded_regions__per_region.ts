export function solve(board: string[][]): string[][] {
  if (board.length === 0 || board[0].length === 0) return board;

  const rows = board.length;
  const columns = board[0].length;

  // The direct reading: find each region, then decide whether it escapes. It
  // works, and it needs a second idea the border search does not -- the whole
  // region has to be collected before any verdict can be given, so the search
  // cannot stop early and the escape test is over the component rather than a
  // single square.
  const seen = new Set<string>();
  const doomed = new Set<string>();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] !== "O" || seen.has(`${r},${c}`)) continue;
      const region: [number, number][] = [];
      const stack: [number, number][] = [[r, c]];
      const inRegion = new Set<string>();
      while (stack.length) {
        const [rr, cc] = stack.pop()!;
        if (rr < 0 || rr >= rows || cc < 0 || cc >= columns) continue;
        if (inRegion.has(`${rr},${cc}`) || board[rr][cc] !== "O") continue;
        inRegion.add(`${rr},${cc}`);
        region.push([rr, cc]);
        stack.push([rr - 1, cc], [rr + 1, cc], [rr, cc - 1], [rr, cc + 1]);
      }
      for (const key of inRegion) seen.add(key);
      const escapes = region.some(
        ([rr, cc]) => rr === 0 || cc === 0 || rr === rows - 1 || cc === columns - 1,
      );
      if (!escapes) for (const key of inRegion) doomed.add(key);
    }
  }

  return board.map((row, r) => row.map((value, c) => (doomed.has(`${r},${c}`) ? "X" : value)));
}

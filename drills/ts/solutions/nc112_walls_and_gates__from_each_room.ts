const INFINITY = 2147483647;

export function wallsAndGates(rooms: number[][]): number[][] {
  if (rooms.length === 0 || rooms[0].length === 0) return rooms;

  const rows = rooms.length;
  const columns = rooms[0].length;

  // One search per empty room, looking for the nearest gate. The answer is the
  // same and the cost is not: every room re-explores the same corridors. Worth
  // writing once to see why starting from the gates instead -- the sources, not
  // the questions -- collapses all of it into a single pass.
  const nearest = (start: [number, number]): number => {
    const seen = new Set([`${start[0]},${start[1]}`]);
    let frontier = [start];
    let steps = 0;
    while (frontier.length) {
      const following: [number, number][] = [];
      for (const [r, c] of frontier) {
        if (rooms[r][c] === 0) return steps;
        for (const [nr, nc] of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]) {
          if (nr < 0 || nr >= rows || nc < 0 || nc >= columns) continue;
          if (rooms[nr][nc] === -1 || seen.has(`${nr},${nc}`)) continue;
          seen.add(`${nr},${nc}`);
          following.push([nr, nc]);
        }
      }
      frontier = following;
      steps++;
    }
    return INFINITY;
  };

  return rooms.map((row, r) =>
    row.map((value, c) => (value === INFINITY ? nearest([r, c]) : value)),
  );
}

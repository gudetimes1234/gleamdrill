export function numIslands(grid: string[][]): number {
  const land = new Set<string>();
  grid.forEach((row, r) => row.forEach((value, c) => value === "1" && land.add(`${r},${c}`)));

  // Union-find instead of flood fill: every square starts as its own island and
  // each adjacency merges two. Only right and down are needed -- every pair of
  // neighbours is reached once that way -- and the answer is how many roots are
  // left. This is the version that keeps working when the grid arrives one
  // square at a time and the count has to be reported after each.
  const parents = new Map<string, string>();
  for (const at of land) parents.set(at, at);

  const find = (at: string): string => {
    while (parents.get(at) !== at) {
      parents.set(at, parents.get(parents.get(at)!)!);
      at = parents.get(at)!;
    }
    return at;
  };

  for (const at of land) {
    const [r, c] = at.split(",").map(Number);
    for (const other of [`${r + 1},${c}`, `${r},${c + 1}`]) {
      if (!land.has(other)) continue;
      const a = find(at);
      const b = find(other);
      if (a !== b) parents.set(a, b);
    }
  }

  return new Set([...land].map(find)).size;
}

export function numIslands(grid: string[][]): number {
  const land = new Set<string>();
  grid.forEach((row, r) => row.forEach((value, c) => value === "1" && land.add(`${r},${c}`)));

  // Counting connected components: start a search at every piece of land not
  // already reached, and each search that has to be started is one more island.
  // Marking as you go is what stops a component being counted once per square.
  const seen = new Set<string>();
  let count = 0;

  for (const at of land) {
    if (seen.has(at)) continue;
    count++;
    const stack = [at];
    while (stack.length) {
      const key = stack.pop()!;
      if (!land.has(key) || seen.has(key)) continue;
      seen.add(key);
      const [r, c] = key.split(",").map(Number);
      stack.push(`${r - 1},${c}`, `${r + 1},${c}`, `${r},${c - 1}`, `${r},${c + 1}`);
    }
  }

  return count;
}

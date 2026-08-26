export function pacificAtlantic(heights: number[][]): number[][] {
  if (heights.length === 0 || heights[0].length === 0) return [];

  const rows = heights.length;
  const columns = heights[0].length;

  // Search *from* each ocean rather than from each cell. Asking "can this
  // square reach the sea?" means a fresh downhill search per square; asking
  // "which squares can the sea reach?" is two uphill searches in total, and the
  // answer is where they overlap.
  const uphill = (starts: [number, number][]): Set<string> => {
    const reached = new Set<string>();
    const frontier = [...starts];
    let head = 0;
    while (head < frontier.length) {
      const [r, c] = frontier[head++];
      if (reached.has(`${r},${c}`)) continue;
      reached.add(`${r},${c}`);
      for (const [nr, nc] of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]) {
        if (nr >= 0 && nr < rows && nc >= 0 && nc < columns && heights[nr][nc] >= heights[r][c]) {
          frontier.push([nr, nc]);
        }
      }
    }
    return reached;
  };

  const pacific: [number, number][] = [];
  const atlantic: [number, number][] = [];
  for (let c = 0; c < columns; c++) {
    pacific.push([0, c]);
    atlantic.push([rows - 1, c]);
  }
  for (let r = 0; r < rows; r++) {
    pacific.push([r, 0]);
    atlantic.push([r, columns - 1]);
  }

  const fromPacific = uphill(pacific);
  const fromAtlantic = uphill(atlantic);

  return [...fromPacific]
    .filter((key) => fromAtlantic.has(key))
    .map((key) => key.split(",").map(Number))
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

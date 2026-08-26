export function pacificAtlantic(heights: number[][]): number[][] {
  if (heights.length === 0 || heights[0].length === 0) return [];

  const rows = heights.length;
  const columns = heights[0].length;

  // The direct reading: from each square, flow downhill and see which edges are
  // reachable. Correct, and it repeats nearly all of its work -- every square
  // on a shared downhill path re-explores the same route. Reversing the
  // question is what removes the repetition.
  const downhill = (start: [number, number]): [number, number][] => {
    const reached = new Set<string>();
    const frontier = [start];
    let head = 0;
    while (head < frontier.length) {
      const [r, c] = frontier[head++];
      if (reached.has(`${r},${c}`)) continue;
      reached.add(`${r},${c}`);
      for (const [nr, nc] of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]) {
        if (nr >= 0 && nr < rows && nc >= 0 && nc < columns && heights[nr][nc] <= heights[r][c]) {
          frontier.push([nr, nc]);
        }
      }
    }
    return [...reached].map((key) => key.split(",").map(Number) as [number, number]);
  };

  const out: number[][] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const reached = downhill([r, c]);
      const touchesPacific = reached.some(([rr, cc]) => rr === 0 || cc === 0);
      const touchesAtlantic = reached.some(([rr, cc]) => rr === rows - 1 || cc === columns - 1);
      if (touchesPacific && touchesAtlantic) out.push([r, c]);
    }
  }

  return out.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

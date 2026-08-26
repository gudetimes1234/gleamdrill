export function minWindow(s: string, t: string): string {
  if (s === "" || t === "") return "";

  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);

  // Only the positions that could possibly matter. For a long haystack and a
  // short needle this is a far shorter walk than the whole string.
  const positions: [number, string][] = [];
  for (let i = 0; i < s.length; i++) {
    if (need.has(s[i])) positions.push([i, s[i]]);
  }

  const window = new Map<string, number>();
  let satisfied = 0;
  let left = 0;
  let bestStart = 0;
  let bestLength = 0;

  for (const [index, c] of positions) {
    window.set(c, (window.get(c) ?? 0) + 1);
    if (window.get(c) === need.get(c)) satisfied++;

    while (satisfied === need.size) {
      const [start, leaving] = positions[left];
      const length = index - start + 1;
      if (bestLength === 0 || length < bestLength) {
        bestStart = start;
        bestLength = length;
      }
      window.set(leaving, (window.get(leaving) ?? 0) - 1);
      if ((window.get(leaving) ?? 0) < (need.get(leaving) ?? 0)) satisfied--;
      left++;
    }
  }

  return s.slice(bestStart, bestStart + bestLength);
}

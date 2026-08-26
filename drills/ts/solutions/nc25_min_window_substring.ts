export function minWindow(s: string, t: string): string {
  if (s === "" || t === "") return "";

  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);

  let missing = t.length;
  let left = 0;
  let bestStart = 0;
  let bestLength = 0;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if ((need.get(c) ?? 0) > 0) missing--;
    need.set(c, (need.get(c) ?? 0) - 1);

    while (missing === 0) {
      if (bestLength === 0 || right - left + 1 < bestLength) {
        bestStart = left;
        bestLength = right - left + 1;
      }
      const leaving = s[left];
      need.set(leaving, (need.get(leaving) ?? 0) + 1);
      if ((need.get(leaving) ?? 0) > 0) missing++;
      left++;
    }
  }

  return s.slice(bestStart, bestStart + bestLength);
}

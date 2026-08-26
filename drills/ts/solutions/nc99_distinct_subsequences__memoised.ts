export function numDistinct(s: string, t: string): number {
  const memo = new Map<string, number>();

  // The choice written out: when the characters match, either use this source
  // character for this target character or skip it; when they do not, skipping
  // is the only option. Running out of target is one complete subsequence,
  // which is why the base case is 1 rather than 0.
  const ways = (i: number, j: number): number => {
    if (j >= t.length) return 1;
    if (i >= s.length) return 0;
    const key = `${i},${j}`;
    if (!memo.has(key)) {
      let total = ways(i + 1, j);
      if (s[i] === t[j]) total += ways(i + 1, j + 1);
      memo.set(key, total);
    }
    return memo.get(key)!;
  };

  return ways(0, 0);
}

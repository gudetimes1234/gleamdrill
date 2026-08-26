export function wordBreak(s: string, wordDict: string[]): boolean {
  const words = new Set(wordDict);
  const memo = new Map<number, boolean>();

  // Top-down: from this position, does any dictionary word start here and leave
  // a suffix that also breaks? Without the cache the same suffix is asked about
  // once per way of reaching it, which is where the exponential blow-up on
  // inputs like "aaaa...b" comes from.
  const breaks = (start: number): boolean => {
    if (start >= s.length) return true;
    if (!memo.has(start)) {
      let found = false;
      for (let end = start + 1; end <= s.length && !found; end++) {
        if (words.has(s.slice(start, end)) && breaks(end)) found = true;
      }
      memo.set(start, found);
    }
    return memo.get(start)!;
  };

  return breaks(0);
}

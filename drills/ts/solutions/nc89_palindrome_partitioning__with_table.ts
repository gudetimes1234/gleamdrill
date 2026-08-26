export function partition(s: string): string[][] {
  const n = s.length;

  // Work out which spans are palindromes once, up front, rather than re-testing
  // the same prefix on every branch of the search. The search is then pure
  // choice: a table lookup replaces a linear scan at every step.
  const table = new Map<string, boolean>();
  for (let span = 0; span < n; span++) {
    for (let i = 0; i + span < n; i++) {
      const j = i + span;
      const inside = j - i < 2 ? true : (table.get(`${i + 1},${j - 1}`) ?? false);
      table.set(`${i},${j}`, s[i] === s[j] && inside);
    }
  }

  const build = (start: number): string[][] => {
    if (start >= n) return [[]];
    const out: string[][] = [];
    for (let end = start; end < n; end++) {
      if (!table.get(`${start},${end}`)) continue;
      for (const rest of build(end + 1)) out.push([s.slice(start, end + 1), ...rest]);
    }
    return out;
  };

  return build(0);
}

export function numDistinct(s: string, t: string): number {
  // Row j counts the ways to build the first j characters of t out of the
  // source seen so far. A new source character can extend a count at j-1 into
  // one at j, but only if it matches t[j-1].
  //
  // The row must be swept right to left: left to right, an update at j-1 feeds
  // straight into j and the same source character gets used twice.
  const row = new Array<number>(t.length + 1).fill(0);
  row[0] = 1;

  for (const c of s) {
    for (let j = t.length; j >= 1; j--) {
      if (c === t[j - 1]) row[j] += row[j - 1];
    }
  }

  return row[t.length];
}

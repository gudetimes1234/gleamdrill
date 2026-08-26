export function isMatch(s: string, p: string): boolean {
  const memo = new Map<string, boolean>();

  // A star binds to the character *before* it, so the pattern has to be read
  // two symbols at a time. Given "x*", either skip the pair entirely -- zero
  // copies -- or, if x matches here, consume one character of the text and stay
  // on the same pair. Everything else is a single-character match.
  const works = (i: number, j: number): boolean => {
    if (j >= p.length) return i >= s.length;
    const key = `${i},${j}`;
    if (!memo.has(key)) {
      const here = i < s.length && (p[j] === s[i] || p[j] === ".");
      memo.set(
        key,
        j + 1 < p.length && p[j + 1] === "*"
          ? works(i, j + 2) || (here && works(i + 1, j))
          : here && works(i + 1, j + 1),
      );
    }
    return memo.get(key)!;
  };

  return works(0, 0);
}

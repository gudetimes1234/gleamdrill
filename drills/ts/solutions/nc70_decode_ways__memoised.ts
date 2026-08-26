export function numDecodings(s: string): number {
  if (s.length === 0) return 0;

  const memo = new Map<number, number>();

  // The same two choices as a recursion from the front: take one character, or
  // take two if they read as 10 to 26. Reaching the end is one complete
  // decoding, which is why the base case returns 1 rather than 0.
  const ways = (i: number): number => {
    if (i >= s.length) return 1;
    if (s[i] === "0") return 0;
    if (!memo.has(i)) {
      let total = ways(i + 1);
      const pair = Number(s.slice(i, i + 2));
      if (i + 1 < s.length && pair >= 10 && pair <= 26) total += ways(i + 2);
      memo.set(i, total);
    }
    return memo.get(i)!;
  };

  return ways(0);
}

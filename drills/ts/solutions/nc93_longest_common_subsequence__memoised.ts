export function longestCommonSubsequence(text1: string, text2: string): number {
  const memo = new Map<string, number>();

  // The same recurrence from the front, with a cache. Written this way the
  // choice is explicit -- match and advance both, or give up one character from
  // one side -- which the rolling row hides behind its indices.
  const best = (i: number, j: number): number => {
    if (i >= text1.length || j >= text2.length) return 0;
    const key = `${i},${j}`;
    if (!memo.has(key)) {
      memo.set(
        key,
        text1[i] === text2[j]
          ? best(i + 1, j + 1) + 1
          : Math.max(best(i + 1, j), best(i, j + 1)),
      );
    }
    return memo.get(key)!;
  };

  return best(0, 0);
}

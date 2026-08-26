export function minDistance(word1: string, word2: string): number {
  const memo = new Map<string, number>();

  // The same three edits as an explicit choice from the front. Running out of
  // one word costs whatever is left of the other, since every remaining
  // character has to be inserted or deleted.
  const cost = (i: number, j: number): number => {
    if (i >= word1.length) return word2.length - j;
    if (j >= word2.length) return word1.length - i;
    const key = `${i},${j}`;
    if (!memo.has(key)) {
      memo.set(
        key,
        word1[i] === word2[j]
          ? cost(i + 1, j + 1)
          : 1 + Math.min(cost(i + 1, j + 1), cost(i + 1, j), cost(i, j + 1)),
      );
    }
    return memo.get(key)!;
  };

  return cost(0, 0);
}

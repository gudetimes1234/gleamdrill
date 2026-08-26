export function change(amount: number, coins: number[]): number {
  const usable = coins.filter((coin) => coin > 0);
  const memo = new Map<string, number>();

  // The same "combinations not permutations" rule stated as a choice instead of
  // a loop order: either use this coin again, or set it aside for good. Setting
  // it aside permanently is what fixes one order per combination.
  const ways = (index: number, remaining: number): number => {
    if (remaining === 0) return 1;
    if (index >= usable.length) return 0;
    const key = `${index},${remaining}`;
    if (!memo.has(key)) {
      const using = usable[index] <= remaining ? ways(index, remaining - usable[index]) : 0;
      memo.set(key, using + ways(index + 1, remaining));
    }
    return memo.get(key)!;
  };

  return ways(0, amount);
}

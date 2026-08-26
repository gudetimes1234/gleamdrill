export function maxProfit(prices: number[]): number {
  const memo = new Map<string, number>();

  // The same three states as an explicit choice at each day: buy, sell, or do
  // nothing. After selling the recursion skips a day, which is the cooldown
  // stated where it happens rather than encoded in which value is read.
  const best = (day: number, holding: boolean): number => {
    if (day >= prices.length) return 0;
    const key = `${day},${holding}`;
    if (!memo.has(key)) {
      const waiting = best(day + 1, holding);
      const acting = holding
        ? prices[day] + best(day + 2, false)
        : best(day + 1, true) - prices[day];
      memo.set(key, Math.max(waiting, acting));
    }
    return memo.get(key)!;
  };

  return best(0, false);
}

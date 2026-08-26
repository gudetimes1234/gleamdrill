export function coinChange(coins: number[], amount: number): number {
  // Build up from zero: the cheapest way to make a target is one coin more than
  // the cheapest way to make what is left after removing some coin. An amount
  // with no entry is simply unreachable, which saves inventing a sentinel for
  // infinity.
  const table = new Map<number, number>([[0, 0]]);

  for (let target = 1; target <= amount; target++) {
    const options = coins
      .filter((coin) => coin <= target && table.has(target - coin))
      .map((coin) => table.get(target - coin)!);
    if (options.length) table.set(target, Math.min(...options) + 1);
  }

  return table.get(amount) ?? -1;
}

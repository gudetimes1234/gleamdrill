export function change(amount: number, coins: number[]): number {
  // Combinations, not permutations -- which is entirely decided by the loop
  // order. Coins on the outside means each coin is considered once and for all
  // before the next is looked at, so 1+2 and 2+1 can never both be counted.
  // Swapping the loops would count orderings instead.
  const ways = new Array<number>(amount + 1).fill(0);
  ways[0] = 1;

  for (const coin of coins) {
    if (coin <= 0) continue;
    for (let target = coin; target <= amount; target++) ways[target] += ways[target - coin];
  }

  return ways[amount];
}

export function maxProfit(prices: number[]): number {
  let lowest = Infinity;
  let profit = 0;
  for (const price of prices) {
    lowest = Math.min(lowest, price);
    profit = Math.max(profit, price - lowest);
  }
  return profit;
}

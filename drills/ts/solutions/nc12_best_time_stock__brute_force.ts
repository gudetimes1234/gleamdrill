export function maxProfit(prices: number[]): number {
  // Every buy day against every later sell day. O(n^2), and the definition of
  // the problem written out — the single pass is the optimisation.
  let profit = 0;
  for (let buy = 0; buy < prices.length; buy++) {
    for (let sell = buy + 1; sell < prices.length; sell++) {
      profit = Math.max(profit, prices[sell] - prices[buy]);
    }
  }
  return profit;
}

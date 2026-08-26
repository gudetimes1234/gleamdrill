export function maxProfit(prices: number[]): number {
  // Three states rather than one number: holding a share, having just sold (so
  // today is the cooldown), and free to act. Each day's states depend only on
  // yesterday's, so the whole thing is three rolling values -- and the cooldown
  // is expressed simply by "free" never reading "sold" from the same day.
  let hold = -Infinity;
  let sold = -Infinity;
  let rest = 0;

  for (const price of prices) {
    [hold, sold, rest] = [Math.max(hold, rest - price), hold + price, Math.max(rest, sold)];
  }

  return Math.max(sold, rest, 0);
}

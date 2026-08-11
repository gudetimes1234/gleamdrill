export function dailyTemperatures(temperatures: number[]): number[] {
  // For each day, scan forward until it gets warmer. O(n^2), and the direct
  // reading of the question — the monotonic stack exists only to avoid
  // rescanning the same cold stretch once per day.
  return temperatures.map((temp, i) => {
    for (let j = i + 1; j < temperatures.length; j++) {
      if (temperatures[j] > temp) return j - i;
    }
    return 0;
  });
}

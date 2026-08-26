export function uniquePaths(m: number, n: number): number {
  if (m <= 0 || n <= 0) return 0;

  // Every path is exactly m-1 downs and n-1 rights in some order, so the count
  // is the number of ways to choose which of the m+n-2 moves are downs -- a
  // binomial coefficient, and no grid at all. Multiplying and dividing in step
  // keeps every intermediate an exact integer.
  const downs = m - 1;
  const total = m + n - 2;
  let result = 1;
  for (let i = 1; i <= downs; i++) result = (result * (total - downs + i)) / i;

  return result;
}

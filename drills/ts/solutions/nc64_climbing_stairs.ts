export function climbStairs(n: number): number {
  // The last move was either one step or two, so the ways to reach step n are
  // the ways to reach n-1 plus the ways to reach n-2 -- Fibonacci with a
  // staircase painted on it. Only the last two values matter.
  let previous = 0;
  let current = 1;
  for (let i = 0; i < n; i++) [previous, current] = [current, previous + current];
  return current;
}

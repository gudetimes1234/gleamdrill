export function myPow(x: number, n: number): number {
  let magnitude = 1;
  for (let i = 0; i < Math.abs(n); i++) magnitude *= x;
  return n < 0 ? 1 / magnitude : magnitude;
}

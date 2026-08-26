export function myPow(x: number, n: number): number {
  return n < 0 ? 1 / power(x, -n) : power(x, n);
}

// Halving the exponent halves the work: x^n is (x^(n/2))^2, with one extra
// multiplication when n is odd. O(log n) multiplications rather than n.
function power(x: number, n: number): number {
  if (n === 0) return 1;
  const half = power(x, Math.floor(n / 2));
  return n % 2 === 0 ? half * half : half * half * x;
}

export function isHappy(n: number): boolean {
  // The sequence has to repeat eventually -- squares of digits are bounded, so
  // there are only finitely many values it can reach. Remembering what has been
  // seen turns "does it loop?" into a set lookup.
  const seen = new Set<number>();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = squareDigits(n);
  }
  return n === 1;
}

function squareDigits(n: number): number {
  let total = 0;
  while (n > 0) {
    const digit = n % 10;
    total += digit * digit;
    n = Math.floor(n / 10);
  }
  return total;
}

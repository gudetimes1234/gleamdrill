const LARGEST = 2147483647;
const SMALLEST = -2147483648;

export function reverse(x: number): number {
  // Peel a digit off the bottom of the input and push it onto the bottom of the
  // result. The overflow test has to happen *before* the multiply, because in a
  // fixed-width language the multiply is where the value would be lost.
  const sign = x < 0 ? -1 : 1;
  let remaining = Math.abs(x);
  let result = 0;

  while (remaining > 0) {
    if (result > Math.floor(LARGEST / 10)) return 0;
    result = result * 10 + (remaining % 10);
    remaining = Math.floor(remaining / 10);
  }

  const signed = result * sign;
  return signed > LARGEST || signed < SMALLEST ? 0 : signed;
}

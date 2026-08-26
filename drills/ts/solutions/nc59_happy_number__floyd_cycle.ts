export function isHappy(n: number): boolean {
  // The same question with no memory at all: run one pointer at single speed
  // and another at double, and they meet inside whatever cycle exists. Meeting
  // at 1 means the cycle is the fixed point; meeting anywhere else means it is
  // not. Constant space, which is the whole reason to know it.
  let slow = n;
  let fast = squareDigits(n);
  while (slow !== fast) {
    slow = squareDigits(slow);
    fast = squareDigits(squareDigits(fast));
  }
  return slow === 1;
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

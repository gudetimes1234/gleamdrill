export function plusOne(digits: number[]): number[] {
  // Adding one is a carry that starts at 1 and dies as soon as a digit below
  // nine absorbs it. The only interesting case is when it never does, and the
  // number grows a digit.
  const out: number[] = [];
  let carry = 1;
  for (let i = digits.length - 1; i >= 0; i--) {
    const total = digits[i] + carry;
    out.push(total % 10);
    carry = Math.floor(total / 10);
  }
  if (carry) out.push(carry);
  return out.reverse();
}

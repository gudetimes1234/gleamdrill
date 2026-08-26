export function reverseBits(n: number): number {
  // Peel the bottom bit off the input and push it onto the bottom of the
  // result: the first bit out is the last bit in. Fixed at 32 rounds, because
  // the width is part of the problem rather than a property of the value.
  //
  // >>> 0 at the end because JavaScript's bitwise operators produce a *signed*
  // 32-bit result, and the answer here is unsigned.
  let reversed = 0;
  for (let i = 0; i < 32; i++) {
    reversed = (reversed << 1) | (n & 1);
    n >>>= 1;
  }
  return reversed >>> 0;
}

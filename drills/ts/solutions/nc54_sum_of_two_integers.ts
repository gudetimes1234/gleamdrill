export function getSum(a: number, b: number): number {
  // Addition without +. XOR is addition that forgets to carry; AND finds
  // exactly the places a carry was owed, and shifting it left one puts it where
  // it belongs. Repeat until nothing is owed.
  //
  // No masking here: JavaScript's bitwise operators already work on signed
  // 32-bit values, so two's complement comes out right on its own.
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}

export function getSum(a: number, b: number): number {
  // The same addition written as hardware: thirty-two full adders in a row,
  // each taking two input bits and a carry and producing a sum bit and a carry
  // out. Slower than the XOR loop, which stops as soon as no carries are left,
  // but it is where the XOR loop comes from.
  let result = 0;
  let carry = 0;

  for (let i = 0; i < 32; i++) {
    const x = (a >> i) & 1;
    const y = (b >> i) & 1;
    const xor = x ^ y;
    result |= (xor ^ carry) << i;
    carry = (x & y) | (carry & xor);
  }

  return result;
}

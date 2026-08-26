const LARGEST = 2147483647;
const SMALLEST = -2147483648;

export function reverse(x: number): number {
  // Reversing the text cannot overflow here, so the range check is a plain
  // comparison at the end rather than a guard inside the loop -- which is only
  // safe because the value is not held in 32 bits along the way.
  const magnitude = Number([...String(Math.abs(x))].reverse().join(""));
  const result = x < 0 ? -magnitude : magnitude;
  return result > LARGEST || result < SMALLEST ? 0 : result;
}

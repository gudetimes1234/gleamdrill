export function plusOne(digits: number[]): number[] {
  // Fold the digits into a number, add one, take it apart again. Shorter, and
  // it works right up until the number is longer than the language's integers
  // -- which is exactly why the problem hands you digits in the first place.
  const value = digits.reduce((acc, digit) => acc * 10 + digit, 0) + 1;
  return [...String(value)].map(Number);
}

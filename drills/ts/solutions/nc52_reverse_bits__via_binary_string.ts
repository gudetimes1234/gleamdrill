export function reverseBits(n: number): number {
  // Write the number out in binary, pad to the full width, reverse the text,
  // read it back. Slower and allocates, but the padding makes the thing the bit
  // version keeps implicit -- that the width is 32, not however many bits this
  // particular value happens to need -- impossible to forget.
  const bits = (n >>> 0).toString(2).padStart(32, "0");
  return parseInt([...bits].reverse().join(""), 2);
}

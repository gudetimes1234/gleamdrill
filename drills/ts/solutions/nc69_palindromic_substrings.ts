export function countSubstrings(s: string): number {
  // Same 2n centres as finding the longest one, except that here every
  // successful widening is itself an answer, so the count is how many times the
  // expansion succeeded rather than how far it got.
  let total = 0;
  for (let i = 0; i < s.length; i++) total += grow(s, i, i) + grow(s, i, i + 1);
  return total;
}

function grow(s: string, left: number, right: number): number {
  let count = 0;
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    count++;
    left--;
    right++;
  }
  return count;
}

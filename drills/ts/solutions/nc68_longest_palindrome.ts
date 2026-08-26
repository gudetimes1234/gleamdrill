export function longestPalindrome(s: string): string {
  // Every palindrome has a centre, and there are only 2n of them -- n single
  // characters and n gaps between them. Growing outwards from each is O(n^2)
  // total and needs no table.
  let bestStart = 0;
  let bestLength = 0;

  for (let i = 0; i < s.length; i++) {
    for (const [left, right] of [[i, i], [i, i + 1]]) {
      const [start, length] = expand(s, left, right);
      if (length > bestLength) {
        bestStart = start;
        bestLength = length;
      }
    }
  }

  return s.slice(bestStart, bestStart + bestLength);
}

// Widens while the ends match, then reports where it stopped as a start and a
// length. The two pointers have gone one step too far by then, which is where
// the +1 and the -1 come from.
function expand(s: string, left: number, right: number): [number, number] {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  return [left + 1, right - left - 1];
}

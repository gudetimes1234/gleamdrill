export function longestPalindrome(s: string): string {
  // Every start with every length. O(n^3) once the palindrome check is counted
  // -- the definition, and what centre expansion is an optimisation of.
  let best = "";
  for (let start = 0; start < s.length; start++) {
    for (let end = start + 1; end <= s.length; end++) {
      const candidate = s.slice(start, end);
      if (candidate.length > best.length && candidate === [...candidate].reverse().join("")) {
        best = candidate;
      }
    }
  }
  return best;
}

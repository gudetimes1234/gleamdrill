export function countSubstrings(s: string): number {
  // The table says whether s[i..j] is a palindrome. It is when its ends match
  // and whatever is between them already was -- so the spans have to be filled
  // shortest first, which is the whole reason for the outer loop over length.
  const n = s.length;
  const table = new Map<string, boolean>();
  let total = 0;

  for (let length = 0; length < n; length++) {
    for (let i = 0; i + length < n; i++) {
      const j = i + length;
      const inside = j - i < 2 ? true : (table.get(`${i + 1},${j - 1}`) ?? false);
      const palindrome = s[i] === s[j] && inside;
      table.set(`${i},${j}`, palindrome);
      if (palindrome) total++;
    }
  }

  return total;
}

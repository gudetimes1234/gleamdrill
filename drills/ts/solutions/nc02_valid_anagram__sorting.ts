export function isAnagram(s: string, t: string): boolean {
  // Two words are anagrams exactly when their sorted letters match. O(n log n),
  // and there is no counting to get wrong.
  const letters = (word: string) => [...word].sort().join("");
  return letters(s) === letters(t);
}

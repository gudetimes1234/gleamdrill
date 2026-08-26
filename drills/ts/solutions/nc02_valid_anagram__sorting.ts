export function isAnagram(s: string, t: string): boolean {
  const letters = (word: string) => [...word].sort().join("");
  return letters(s) === letters(t);
}

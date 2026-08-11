export function groupAnagrams(strs: string[]): string[][] {
  // The sorted word itself is an anagram-invariant key: shorter than tallying
  // letters, and it works for any alphabet rather than just a-z.
  const groups = new Map<string, string[]>();

  for (const s of strs) {
    const key = [...s].sort().join("");
    const group = groups.get(key);
    if (group) {
      group.push(s);
    } else {
      groups.set(key, [s]);
    }
  }

  return [...groups.values()];
}

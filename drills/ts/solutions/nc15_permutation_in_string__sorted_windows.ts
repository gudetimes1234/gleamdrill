export function checkInclusion(s1: string, s2: string): boolean {
  // Every window of the right length, sorted and compared. Slower than sliding
  // counts, but there is no incremental state to get wrong: the whole method is
  // "is this window an anagram?".
  if (s1.length > s2.length) return false;

  const needle = [...s1].sort().join("");
  for (let start = 0; start + s1.length <= s2.length; start++) {
    if ([...s2.slice(start, start + s1.length)].sort().join("") === needle) {
      return true;
    }
  }

  return false;
}

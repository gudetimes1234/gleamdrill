export function wordBreak(s: string, wordDict: string[]): boolean {
  const words = new Set(wordDict);

  // Reachable positions rather than a table of booleans: start at 0, and a
  // position is reachable when some word in the dictionary bridges the gap from
  // a position already reached.
  const reached = new Set([0]);
  for (let end = 1; end <= s.length; end++) {
    for (let start = 0; start < end; start++) {
      if (reached.has(start) && words.has(s.slice(start, end))) {
        reached.add(end);
        break;
      }
    }
  }

  return reached.has(s.length);
}

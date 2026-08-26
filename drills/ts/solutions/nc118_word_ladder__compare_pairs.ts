export function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const words = new Set(wordList);
  if (!words.has(endWord)) return 0;

  // Neighbours found by comparing against every remaining word. Simpler to
  // state and O(n) comparisons per expansion rather than a constant number of
  // lookups -- which is the cost the wildcard buckets remove.
  const seen = new Set([beginWord]);
  let frontier = [beginWord];
  let steps = 1;

  while (frontier.length) {
    if (frontier.includes(endWord)) return steps;
    const following: string[] = [];
    for (const candidate of words) {
      if (seen.has(candidate)) continue;
      if (frontier.some((word) => differsByOne(word, candidate))) {
        seen.add(candidate);
        following.push(candidate);
      }
    }
    frontier = following;
    steps++;
  }

  return 0;
}

function differsByOne(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let differences = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) differences++;
  return differences === 1;
}

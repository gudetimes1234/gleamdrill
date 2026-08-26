export function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const words = new Set(wordList);
  if (!words.has(endWord)) return 0;

  // The graph is never built: "hot" and "dot" are neighbours because they share
  // the pattern "*ot", so bucketing every word under each of its wildcard
  // patterns gives the adjacency for free. Comparing every pair instead costs
  // O(n^2) comparisons before the search even starts.
  const buckets = new Map<string, string[]>();
  for (const word of words) {
    for (let i = 0; i < word.length; i++) {
      const pattern = word.slice(0, i) + "*" + word.slice(i + 1);
      if (!buckets.has(pattern)) buckets.set(pattern, []);
      buckets.get(pattern)!.push(word);
    }
  }

  const seen = new Set([beginWord]);
  let frontier = [beginWord];
  let steps = 1;

  while (frontier.length) {
    if (frontier.includes(endWord)) return steps;
    const following: string[] = [];
    for (const word of frontier) {
      for (let i = 0; i < word.length; i++) {
        const pattern = word.slice(0, i) + "*" + word.slice(i + 1);
        for (const neighbour of buckets.get(pattern) ?? []) {
          if (seen.has(neighbour)) continue;
          seen.add(neighbour);
          following.push(neighbour);
        }
      }
    }
    frontier = following;
    steps++;
  }

  return 0;
}

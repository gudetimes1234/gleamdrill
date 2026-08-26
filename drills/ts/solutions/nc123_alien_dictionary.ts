export function alienOrder(words: string[]): string {
  const letters = new Set<string>();
  for (const word of words) for (const letter of word) letters.add(letter);

  const waiting = new Map<string, number>();
  const unlocks = new Map<string, string[]>();
  for (const letter of letters) {
    waiting.set(letter, 0);
    unlocks.set(letter, []);
  }

  // Two adjacent words agree up to their first difference, and that difference
  // is the only thing they say about the alphabet -- everything after it is
  // unordered. The one case with no letters to compare is a word followed by a
  // prefix of itself, which no alphabet can explain.
  for (let i = 0; i + 1 < words.length; i++) {
    const first = words[i];
    const second = words[i + 1];
    const shared = Math.min(first.length, second.length);
    let split = -1;
    for (let j = 0; j < shared; j++) {
      if (first[j] !== second[j]) {
        split = j;
        break;
      }
    }
    if (split === -1) {
      if (first.length > second.length) return "";
      continue;
    }
    unlocks.get(first[split])!.push(second[split]);
    waiting.set(second[split], waiting.get(second[split])! + 1);
  }

  const ready = [...letters].filter((letter) => waiting.get(letter) === 0);
  const order: string[] = [];
  while (ready.length) {
    const letter = ready.pop()!;
    order.push(letter);
    for (const following of unlocks.get(letter)!) {
      waiting.set(following, waiting.get(following)! - 1);
      if (waiting.get(following) === 0) ready.push(following);
    }
  }

  // Short means the leftovers all depend on each other: the ordering the words
  // describe is contradictory, so no alphabet satisfies it.
  return order.length === letters.size ? order.join("") : "";
}

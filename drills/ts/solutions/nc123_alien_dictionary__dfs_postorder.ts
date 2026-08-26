export function alienOrder(words: string[]): string {
  const letters = new Set<string>();
  for (const word of words) for (const letter of word) letters.add(letter);

  const after = new Map<string, string[]>();
  for (const letter of letters) after.set(letter, []);

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
    after.get(first[split])!.push(second[split]);
  }

  // Depth-first, recording a letter only once everything that must follow it
  // has been recorded -- so the record comes out backwards and is reversed at
  // the end. The in-progress set is the cycle check: a letter met again on the
  // current path contradicts itself.
  const onPath = new Set<string>();
  const done = new Set<string>();
  const order: string[] = [];

  const visit = (letter: string): boolean => {
    if (onPath.has(letter)) return false;
    if (done.has(letter)) return true;
    onPath.add(letter);
    for (const following of after.get(letter)!) {
      if (!visit(following)) return false;
    }
    onPath.delete(letter);
    done.add(letter);
    order.push(letter);
    return true;
  };

  for (const letter of letters) {
    if (!visit(letter)) return "";
  }

  return order.reverse().join("");
}

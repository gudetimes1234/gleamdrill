export class Trie {
  // Two sets: the whole words, and every prefix of every word. Both questions
  // then answer in one lookup, at the cost of storing O(total letters) strings
  // rather than sharing them -- which is precisely the memory a trie exists to
  // save. The empty prefix is present from the start: it is the root.
  private words = new Set<string>();
  private prefixes = new Set<string>([""]);

  insert(word: string): void {
    this.words.add(word);
    for (let size = 0; size <= word.length; size++) this.prefixes.add(word.slice(0, size));
  }

  search(word: string): boolean {
    return this.words.has(word);
  }

  startsWith(prefix: string): boolean {
    return this.prefixes.has(prefix);
  }
}

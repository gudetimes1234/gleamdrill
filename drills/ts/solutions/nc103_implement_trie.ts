export class Trie {
  // One node per prefix; `terminal` marks the prefixes that are whole words.
  // Without that flag "app" and "apple" are indistinguishable once both are
  // stored, which is the entire difference between search and startsWith.
  private children = new Map<string, Trie>();
  private terminal = false;

  insert(word: string): void {
    let node: Trie = this;
    for (const letter of word) {
      if (!node.children.has(letter)) node.children.set(letter, new Trie());
      node = node.children.get(letter)!;
    }
    node.terminal = true;
  }

  search(word: string): boolean {
    const node = this.walk(word);
    return node !== null && node.terminal;
  }

  startsWith(prefix: string): boolean {
    return this.walk(prefix) !== null;
  }

  private walk(letters: string): Trie | null {
    let node: Trie = this;
    for (const letter of letters) {
      const child = node.children.get(letter);
      if (!child) return null;
      node = child;
    }
    return node;
  }
}

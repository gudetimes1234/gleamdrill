export class WordDictionary {
  private children = new Map<string, WordDictionary>();
  private terminal = false;

  addWord(word: string): void {
    let node: WordDictionary = this;
    for (const letter of word) {
      if (!node.children.has(letter)) node.children.set(letter, new WordDictionary());
      node = node.children.get(letter)!;
    }
    node.terminal = true;
  }

  // A dot has to try every child, which turns the lookup from a walk into a
  // search -- the trie is what keeps that search from being over every word,
  // because a branch that cannot match is abandoned at the first letter.
  search(word: string): boolean {
    if (word === "") return this.terminal;
    const [letter, rest] = [word[0], word.slice(1)];
    if (letter === ".") {
      return [...this.children.values()].some((child) => child.search(rest));
    }
    return this.children.get(letter)?.search(rest) ?? false;
  }
}

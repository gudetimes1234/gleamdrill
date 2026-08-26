export class WordDictionary {
  // Words bucketed by length. A pattern can only match words of its own length,
  // so that one check throws away most of the collection before any character
  // is compared.
  private byLength = new Map<number, string[]>();

  addWord(word: string): void {
    if (!this.byLength.has(word.length)) this.byLength.set(word.length, []);
    this.byLength.get(word.length)!.push(word);
  }

  // No shared prefixes, so every candidate of the right length is compared
  // position by position. Slower than the trie on a large dictionary, and it
  // needs no tree -- which is the trade the trie is making.
  search(word: string): boolean {
    return (this.byLength.get(word.length) ?? []).some((candidate) =>
      [...word].every((p, i) => p === "." || p === candidate[i]),
    );
  }
}

class WordDictionary:
    def __init__(self):
        # Words bucketed by length. A pattern can only match words of its own
        # length, so that one check throws away most of the collection before
        # any character is compared.
        self.byLength = {}

    def addWord(self, word):
        self.byLength.setdefault(len(word), []).append(word)

    # No shared prefixes, so every candidate of the right length is compared
    # position by position. Slower than the trie on a large dictionary, and it
    # needs no tree -- which is the trade the trie is making.
    def search(self, word):
        return any(
            all(p == "." or p == c for p, c in zip(word, candidate))
            for candidate in self.byLength.get(len(word), [])
        )

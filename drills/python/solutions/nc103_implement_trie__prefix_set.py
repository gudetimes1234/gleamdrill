class Trie:
    def __init__(self):
        # Two sets: the whole words, and every prefix of every word. Both
        # questions then answer in one lookup, at the cost of storing O(total
        # letters) strings rather than sharing them -- which is precisely the
        # memory a trie exists to save. The empty prefix is present from the
        # start: it is the root.
        self.words = set()
        self.prefixes = {""}

    def insert(self, word):
        self.words.add(word)
        for size in range(len(word) + 1):
            self.prefixes.add(word[:size])

    def search(self, word):
        return word in self.words

    def startsWith(self, prefix):
        return prefix in self.prefixes

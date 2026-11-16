class Trie:
    def __init__(self):
        # Two sets: the whole words, and every prefix of every word. Both
        # questions then answer in one lookup, at the cost of storing O(total
        # letters) strings rather than sharing them -- which is precisely the
        # memory a trie exists to save. The empty prefix is present from the
        # start: it is the root.
        self.words = set()  # @1
        self.prefixes = {""}  # @2

    def insert(self, word):
        self.words.add(word)  # @3
        for size in range(len(word) + 1):  # @4
            self.prefixes.add(word[:size])  # @5

    def search(self, word):
        return word in self.words  # @6

    def startsWith(self, prefix):
        return prefix in self.prefixes  # @7

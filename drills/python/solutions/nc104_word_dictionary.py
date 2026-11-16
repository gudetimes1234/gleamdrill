class WordDictionary:
    def __init__(self):
        self.children = {}  # @1
        self.terminal = False  # @2

    def addWord(self, word):
        node = self  # @3
        for letter in word:  # @4
            node = node.children.setdefault(letter, WordDictionary())  # @5
        node.terminal = True  # @6

    # A dot has to try every child, which turns the lookup from a walk into a
    # search -- the trie is what keeps that search from being over every word,
    # because a branch that cannot match is abandoned at the first letter.
    def search(self, word):
        if not word:  # @7
            return self.terminal  # @7
        letter, rest = word[0], word[1:]  # @8
        if letter == ".":  # @9
            return any(child.search(rest) for child in self.children.values())  # @10
        return letter in self.children and self.children[letter].search(rest)  # @11

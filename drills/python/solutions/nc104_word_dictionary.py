class WordDictionary:
    def __init__(self):
        self.children = {}
        self.terminal = False

    def addWord(self, word):
        node = self
        for letter in word:
            node = node.children.setdefault(letter, WordDictionary())
        node.terminal = True

    # A dot has to try every child, which turns the lookup from a walk into a
    # search -- the trie is what keeps that search from being over every word,
    # because a branch that cannot match is abandoned at the first letter.
    def search(self, word):
        if not word:
            return self.terminal
        letter, rest = word[0], word[1:]
        if letter == ".":
            return any(child.search(rest) for child in self.children.values())
        return letter in self.children and self.children[letter].search(rest)

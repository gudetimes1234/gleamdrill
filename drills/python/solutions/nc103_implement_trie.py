class Trie:
    def __init__(self):
        # One node per prefix; `terminal` marks the prefixes that are whole
        # words. Without that flag "app" and "apple" are indistinguishable once
        # both are stored, which is the entire difference between search and
        # startsWith.
        self.children = {}
        self.terminal = False

    def insert(self, word):
        node = self
        for letter in word:
            node = node.children.setdefault(letter, Trie())
        node.terminal = True

    def search(self, word):
        node = self.walk(word)
        return node is not None and node.terminal

    def startsWith(self, prefix):
        return self.walk(prefix) is not None

    def walk(self, letters):
        node = self
        for letter in letters:
            if letter not in node.children:
                return None
            node = node.children[letter]
        return node

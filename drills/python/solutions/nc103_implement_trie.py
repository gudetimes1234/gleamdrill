class Trie:
    def __init__(self):
        # One node per prefix; `terminal` marks the prefixes that are whole
        # words. Without that flag "app" and "apple" are indistinguishable once
        # both are stored, which is the entire difference between search and
        # startsWith.
        self.children = {}  # @1
        self.terminal = False  # @2

    def insert(self, word):
        node = self  # @3
        for letter in word:  # @4
            node = node.children.setdefault(letter, Trie())  # @5
        node.terminal = True  # @6

    def search(self, word):
        node = self.walk(word)  # @7
        return node is not None and node.terminal  # @8

    def startsWith(self, prefix):
        return self.walk(prefix) is not None  # @9

    def walk(self, letters):
        node = self  # @10
        for letter in letters:  # @11
            if letter not in node.children:  # @12
                return None  # @12
            node = node.children[letter]  # @13
        return node  # @14

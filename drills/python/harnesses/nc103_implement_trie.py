try:
    (Trie)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__t__ = Trie()
__t__.insert("apple")

__case__("search('apple') after inserting it", True, __t__.search("apple"))
__case__("search('app') -- a prefix, not a word", False, __t__.search("app"))
__case__("startsWith('app')", True, __t__.startsWith("app"))

__t__.insert("app")

__case__("search('app') after inserting it too", True, __t__.search("app"))
__case__("startsWith('apz')", False, __t__.startsWith("apz"))
__case__("search('') on an empty trie", False, Trie().search(""))
__case__("startsWith('') on an empty trie", True, Trie().startsWith(""))

try:
    (ladderLength)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("ladderLength('hit','cog', full list)", 5, ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]))
__case__("ladderLength('hit','cog', without cog)", 0, ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log"]))
__case__("ladderLength('a','c', ['a','b','c'])", 2, ladderLength("a", "c", ["a", "b", "c"]))
__case__("ladderLength('hit','hit', ['hit'])", 1, ladderLength("hit", "hit", ["hit"]))
__case__("ladderLength('hot','dog', ['hot','dog']) -- no bridge", 0, ladderLength("hot", "dog", ["hot", "dog"]))

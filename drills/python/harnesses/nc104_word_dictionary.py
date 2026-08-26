try:
    (WordDictionary)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__d__ = WordDictionary()
for __w__ in ["bad", "dad", "mad"]:
    __d__.addWord(__w__)

__case__("search('pad')", False, __d__.search("pad"))
__case__("search('bad')", True, __d__.search("bad"))
__case__("search('.ad')", True, __d__.search(".ad"))
__case__("search('b..')", True, __d__.search("b.."))
__case__("search('...')", True, __d__.search("..."))
__case__("search('b') -- too short", False, __d__.search("b"))
__case__("search('....') -- too long", False, __d__.search("...."))

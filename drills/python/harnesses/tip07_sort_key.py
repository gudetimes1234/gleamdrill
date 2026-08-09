try:
    (sortByLength, sortPairs)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("sortByLength(['ccc', 'a', 'bb'])", ["a", "bb", "ccc"], sortByLength(["ccc", "a", "bb"]))
__case__("sortPairs([('b', 1), ('a', 1), ('a', 9)])", [("a", 9), ("a", 1), ("b", 1)], sortPairs([("b", 1), ("a", 1), ("a", 9)]))

try:
    (characterReplacement)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("characterReplacement('ABAB', 2)", 4, characterReplacement("ABAB", 2))
__case__("characterReplacement('AABABBA', 1)", 4, characterReplacement("AABABBA", 1))
__case__("characterReplacement('AAAA', 0)", 4, characterReplacement("AAAA", 0))

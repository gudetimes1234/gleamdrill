try:
    (letterCombinations)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("letterCombinations('23')", ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"], sorted(letterCombinations("23")))
__case__("letterCombinations('')", [], sorted(letterCombinations("")))
__case__("letterCombinations('2')", ["a", "b", "c"], sorted(letterCombinations("2")))
__case__("letterCombinations('9')", ["w", "x", "y", "z"], sorted(letterCombinations("9")))
__case__("letterCombinations('79') count", 16, len(letterCombinations("79")))

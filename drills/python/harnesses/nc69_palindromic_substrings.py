try:
    (countSubstrings)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("countSubstrings('abc')", 3, countSubstrings('abc'))
__case__("countSubstrings('aaa')", 6, countSubstrings('aaa'))
__case__("countSubstrings('')", 0, countSubstrings(''))
__case__("countSubstrings('a')", 1, countSubstrings('a'))
__case__("countSubstrings('aba')", 4, countSubstrings('aba'))
__case__("countSubstrings('abccba')", 9, countSubstrings('abccba'))

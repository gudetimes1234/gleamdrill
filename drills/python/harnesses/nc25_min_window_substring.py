try:
    (minWindow)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("minWindow('ADOBECODEBANC', 'ABC')", "BANC", minWindow("ADOBECODEBANC", "ABC"))
__case__("minWindow('a', 'a')", "a", minWindow("a", "a"))
__case__("minWindow('a', 'aa')", "", minWindow("a", "aa"))
__case__("minWindow('', 'a')", "", minWindow("", "a"))
__case__("minWindow('ab', '')", "", minWindow("ab", ""))
__case__("minWindow('aaflslflsldkalskaaa', 'aaa')", "aaa", minWindow("aaflslflsldkalskaaa", "aaa"))

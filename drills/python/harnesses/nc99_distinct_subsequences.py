try:
    (numDistinct)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("numDistinct('rabbbit', 'rabbit')", 3, numDistinct('rabbbit', 'rabbit'))
__case__("numDistinct('babgbag', 'bag')", 5, numDistinct('babgbag', 'bag'))
__case__("numDistinct('', 'a')", 0, numDistinct('', 'a'))
__case__("numDistinct('a', '')", 1, numDistinct('a', ''))
__case__("numDistinct('abc', 'abc')", 1, numDistinct('abc', 'abc'))
__case__("numDistinct('aaa', 'aa')", 3, numDistinct('aaa', 'aa'))

try:
    (isMatch)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("isMatch('aa', 'a')", False, isMatch('aa', 'a'))
__case__("isMatch('aa', 'a*')", True, isMatch('aa', 'a*'))
__case__("isMatch('ab', '.*')", True, isMatch('ab', '.*'))
__case__("isMatch('aab', 'c*a*b')", True, isMatch('aab', 'c*a*b'))
__case__("isMatch('mississippi', 'mis*is*p*.')", False, isMatch('mississippi', 'mis*is*p*.'))
__case__("isMatch('', '.*')", True, isMatch('', '.*'))
__case__("isMatch('', '')", True, isMatch('', ''))
__case__("isMatch('abc', 'abc')", True, isMatch('abc', 'abc'))

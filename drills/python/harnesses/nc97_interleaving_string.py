try:
    (isInterleave)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("isInterleave('aabcc', 'dbbca', 'aadbbcbcac')", True, isInterleave('aabcc', 'dbbca', 'aadbbcbcac'))
__case__("isInterleave('aabcc', 'dbbca', 'aadbbbaccc')", False, isInterleave('aabcc', 'dbbca', 'aadbbbaccc'))
__case__("isInterleave('', '', '')", True, isInterleave('', '', ''))
__case__("isInterleave('a', '', 'a')", True, isInterleave('a', '', 'a'))
__case__("isInterleave('', 'b', 'b')", True, isInterleave('', 'b', 'b'))
__case__("isInterleave('abc', 'def', 'adbecf')", True, isInterleave('abc', 'def', 'adbecf'))

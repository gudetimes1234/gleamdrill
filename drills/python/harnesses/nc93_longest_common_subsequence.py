try:
    (longestCommonSubsequence)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("longestCommonSubsequence('abcde', 'ace')", 3, longestCommonSubsequence('abcde', 'ace'))
__case__("longestCommonSubsequence('abc', 'abc')", 3, longestCommonSubsequence('abc', 'abc'))
__case__("longestCommonSubsequence('abc', 'def')", 0, longestCommonSubsequence('abc', 'def'))
__case__("longestCommonSubsequence('', 'abc')", 0, longestCommonSubsequence('', 'abc'))
__case__("longestCommonSubsequence('bsbininm', 'jmjkbkjkv')", 1, longestCommonSubsequence('bsbininm', 'jmjkbkjkv'))
__case__("longestCommonSubsequence('ezupkr', 'ubmrapg')", 2, longestCommonSubsequence('ezupkr', 'ubmrapg'))

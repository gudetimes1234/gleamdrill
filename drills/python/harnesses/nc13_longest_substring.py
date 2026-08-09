try:
    (lengthOfLongestSubstring)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("lengthOfLongestSubstring('abcabcbb')", 3, lengthOfLongestSubstring("abcabcbb"))
__case__("lengthOfLongestSubstring('bbbbb')", 1, lengthOfLongestSubstring("bbbbb"))
__case__("lengthOfLongestSubstring('pwwkew')", 3, lengthOfLongestSubstring("pwwkew"))
__case__("lengthOfLongestSubstring('')", 0, lengthOfLongestSubstring(""))

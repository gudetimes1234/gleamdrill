try:
    (longestPalindrome)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("longestPalindrome('cbbd')", 'bb', longestPalindrome('cbbd'))
__case__("longestPalindrome('a')", 'a', longestPalindrome('a'))
__case__("longestPalindrome('')", '', longestPalindrome(''))
__case__("longestPalindrome('forgeeksskeegfor')", 'geeksskeeg', longestPalindrome('forgeeksskeegfor'))
__case__("longestPalindrome('aaaa')", 'aaaa', longestPalindrome('aaaa'))
__case__("longestPalindrome('racecar')", 'racecar', longestPalindrome('racecar'))
__case__("longestPalindrome('abb')", 'bb', longestPalindrome('abb'))

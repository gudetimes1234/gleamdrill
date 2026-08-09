try:
    (isPalindrome)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("isPalindrome('A man, a plan, a canal: Panama')", True, isPalindrome("A man, a plan, a canal: Panama"))
__case__("isPalindrome('race a car')", False, isPalindrome("race a car"))
__case__("isPalindrome(' ')", True, isPalindrome(" "))
__case__("isPalindrome('0P')", False, isPalindrome("0P"))

try:
    (lengthOfLIS)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])", 4, lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]))
__case__("lengthOfLIS([0, 1, 0, 3, 2, 3])", 4, lengthOfLIS([0, 1, 0, 3, 2, 3]))
__case__("lengthOfLIS([7, 7, 7, 7, 7, 7, 7])", 1, lengthOfLIS([7, 7, 7, 7, 7, 7, 7]))
__case__("lengthOfLIS([])", 0, lengthOfLIS([]))
__case__("lengthOfLIS([1])", 1, lengthOfLIS([1]))
__case__("lengthOfLIS([4, 10, 4, 3, 8, 9])", 3, lengthOfLIS([4, 10, 4, 3, 8, 9]))

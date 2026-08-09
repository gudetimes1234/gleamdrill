try:
    (longestConsecutive)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("longestConsecutive([100, 4, 200, 1, 3, 2])", 4, longestConsecutive([100, 4, 200, 1, 3, 2]))
__case__("longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])", 9, longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))
__case__("longestConsecutive([])", 0, longestConsecutive([]))

try:
    (findDuplicate)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("findDuplicate([1,3,4,2,2])", 2, findDuplicate([1, 3, 4, 2, 2]))
__case__("findDuplicate([3,1,3,4,2])", 3, findDuplicate([3, 1, 3, 4, 2]))
__case__("findDuplicate([1,1])", 1, findDuplicate([1, 1]))
__case__("findDuplicate([2,2,2,2,2]) -- repeated more than twice", 2, findDuplicate([2, 2, 2, 2, 2]))
__case__("findDuplicate([1,4,4,2,4])", 4, findDuplicate([1, 4, 4, 2, 4]))

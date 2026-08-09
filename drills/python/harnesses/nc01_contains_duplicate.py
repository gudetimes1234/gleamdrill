try:
    (containsDuplicate)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("containsDuplicate([1, 2, 3, 1])", True, containsDuplicate([1, 2, 3, 1]))
__case__("containsDuplicate([1, 2, 3, 4])", False, containsDuplicate([1, 2, 3, 4]))
__case__("containsDuplicate([])", False, containsDuplicate([]))

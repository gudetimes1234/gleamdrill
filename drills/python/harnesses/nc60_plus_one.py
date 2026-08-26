try:
    (plusOne)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("plusOne([1, 2, 3])", [1, 2, 4], plusOne([1, 2, 3]))
__case__("plusOne([4, 3, 2, 1])", [4, 3, 2, 2], plusOne([4, 3, 2, 1]))
__case__("plusOne([9])", [1, 0], plusOne([9]))
__case__("plusOne([9, 9])", [1, 0, 0], plusOne([9, 9]))
__case__("plusOne([0])", [1], plusOne([0]))
__case__("plusOne([1, 9, 9])", [2, 0, 0], plusOne([1, 9, 9]))

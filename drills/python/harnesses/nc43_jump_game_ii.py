try:
    (jump)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("jump([2, 3, 1, 1, 4])", 2, jump([2, 3, 1, 1, 4]))
__case__("jump([2, 3, 0, 1, 4])", 2, jump([2, 3, 0, 1, 4]))
__case__("jump([0])", 0, jump([0]))
__case__("jump([1])", 0, jump([1]))
__case__("jump([1, 2, 3])", 2, jump([1, 2, 3]))
__case__("jump([1, 1, 1, 1])", 3, jump([1, 1, 1, 1]))

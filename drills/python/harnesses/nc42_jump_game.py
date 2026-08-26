try:
    (canJump)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("canJump([2, 3, 1, 1, 4])", True, canJump([2, 3, 1, 1, 4]))
__case__("canJump([3, 2, 1, 0, 4])", False, canJump([3, 2, 1, 0, 4]))
__case__("canJump([0])", True, canJump([0]))
__case__("canJump([])", True, canJump([]))
__case__("canJump([1, 0, 1, 0])", False, canJump([1, 0, 1, 0]))
__case__("canJump([2, 0, 0])", True, canJump([2, 0, 0]))

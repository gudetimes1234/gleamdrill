try:
    (findKthLargest)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("findKthLargest([3, 2, 1, 5, 6, 4], 2)", 5, findKthLargest([3, 2, 1, 5, 6, 4], 2))
__case__("findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)", 4, findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4))
__case__("findKthLargest([1], 1)", 1, findKthLargest([1], 1))
__case__("findKthLargest([2, 1], 2)", 1, findKthLargest([2, 1], 2))
__case__("findKthLargest([7, 6, 5, 4, 3, 2, 1], 3)", 5, findKthLargest([7, 6, 5, 4, 3, 2, 1], 3))
__case__("findKthLargest([], 1)", None, findKthLargest([], 1))

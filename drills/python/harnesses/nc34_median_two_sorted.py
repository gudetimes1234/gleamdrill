try:
    (findMedianSortedArrays)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("findMedianSortedArrays([1, 3], [2])", 2.0, findMedianSortedArrays([1, 3], [2]))
__case__("findMedianSortedArrays([1, 2], [3, 4])", 2.5, findMedianSortedArrays([1, 2], [3, 4]))
__case__("findMedianSortedArrays([], [1])", 1.0, findMedianSortedArrays([], [1]))
__case__("findMedianSortedArrays([2], [])", 2.0, findMedianSortedArrays([2], []))
__case__("findMedianSortedArrays([], [])", 0.0, findMedianSortedArrays([], []))
__case__("findMedianSortedArrays([1, 2], [])", 1.5, findMedianSortedArrays([1, 2], []))
__case__("findMedianSortedArrays([1, 3, 5, 7], [2, 4, 6])", 4.0, findMedianSortedArrays([1, 3, 5, 7], [2, 4, 6]))

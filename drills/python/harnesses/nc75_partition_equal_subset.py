try:
    (canPartition)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("canPartition([1, 5, 11, 5])", True, canPartition([1, 5, 11, 5]))
__case__("canPartition([1, 2, 3, 5])", False, canPartition([1, 2, 3, 5]))
__case__("canPartition([2, 2])", True, canPartition([2, 2]))
__case__("canPartition([1])", False, canPartition([1]))
__case__("canPartition([1, 1])", True, canPartition([1, 1]))
__case__("canPartition([3, 3, 3, 4, 5])", True, canPartition([3, 3, 3, 4, 5]))

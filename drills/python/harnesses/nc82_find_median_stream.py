try:
    (MedianFinder)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

def __medians__(values):
    finder = MedianFinder()
    out = []
    for value in values:
        finder.addNum(value)
        out.append(finder.findMedian())
    return out

__case__("medians of 1, 2, 3", [1.0, 1.5, 2.0], __medians__([1, 2, 3]))
__case__("medians of 1, 2, 3, 4, 5", [1.0, 1.5, 2.0, 2.5, 3.0], __medians__([1, 2, 3, 4, 5]))
__case__("medians arriving out of order", [5.0, 3.0, 2.0, 2.5], __medians__([5, 1, 2, 3]))
__case__("medians of negatives", [-1.0, -1.5], __medians__([-1, -2]))
__case__("median before anything is added", 0.0, MedianFinder().findMedian())

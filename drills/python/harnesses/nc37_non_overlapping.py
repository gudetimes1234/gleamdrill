try:
    (eraseOverlapIntervals)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])", 1, eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]))
__case__("eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]])", 2, eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]))
__case__("eraseOverlapIntervals([[1, 2], [2, 3]])", 0, eraseOverlapIntervals([[1, 2], [2, 3]]))
__case__("eraseOverlapIntervals([])", 0, eraseOverlapIntervals([]))
__case__("eraseOverlapIntervals([[1, 100], [11, 22], [1, 11], [2, 12]])", 2, eraseOverlapIntervals([[1, 100], [11, 22], [1, 11], [2, 12]]))

try:
    (topKFrequent)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("topKFrequent([1, 1, 1, 2, 2, 3], 2)", [1, 2], topKFrequent([1, 1, 1, 2, 2, 3], 2))
__case__("topKFrequent([1], 1)", [1], topKFrequent([1], 1))
__case__("topKFrequent([5, 5, 4, 4, 4, 3], 1)", [4], topKFrequent([5, 5, 4, 4, 4, 3], 1))

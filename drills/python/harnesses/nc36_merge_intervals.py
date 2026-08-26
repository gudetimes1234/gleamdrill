try:
    (merge)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("merge([[1, 3], [2, 6], [8, 10], [15, 18]])", [[1, 6], [8, 10], [15, 18]], merge([[1, 3], [2, 6], [8, 10], [15, 18]]))
__case__("merge([[1, 4], [4, 5]])", [[1, 5]], merge([[1, 4], [4, 5]]))
__case__("merge([])", [], merge([]))
__case__("merge([[1, 4], [0, 4]])", [[0, 4]], merge([[1, 4], [0, 4]]))
__case__("merge([[1, 4], [2, 3]])", [[1, 4]], merge([[1, 4], [2, 3]]))

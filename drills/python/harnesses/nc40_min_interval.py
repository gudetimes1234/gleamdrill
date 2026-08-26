try:
    (minInterval)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("minInterval([[1, 4], [2, 4], [3, 6], [4, 4]], [2, 3, 4, 5])", [3, 3, 1, 4], minInterval([[1, 4], [2, 4], [3, 6], [4, 4]], [2, 3, 4, 5]))
__case__("minInterval([[2, 3], [2, 5], [1, 8], [20, 25]], [2, 19, 5, 22])", [2, -1, 4, 6], minInterval([[2, 3], [2, 5], [1, 8], [20, 25]], [2, 19, 5, 22]))
__case__("minInterval([], [1, 2])", [-1, -1], minInterval([], [1, 2]))
__case__("minInterval([[1, 10]], [])", [], minInterval([[1, 10]], []))
__case__("minInterval([[1, 3]], [0, 4])", [-1, -1], minInterval([[1, 3]], [0, 4]))

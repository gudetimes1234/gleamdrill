try:
    (DetectSquares)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__store__ = DetectSquares()
__store__.add([3, 10])
__store__.add([11, 2])
__store__.add([3, 2])

__case__("count([11, 10]) with one of each corner", 1, __store__.count([11, 10]))
__case__("count([14, 8]) -- no square", 0, __store__.count([14, 8]))

__store__.add([11, 2])

__case__("count([11, 10]) after adding [11, 2] twice", 2, __store__.count([11, 10]))
__case__("count on an empty store", 0, DetectSquares().count([0, 0]))

__unit__ = DetectSquares()
__unit__.add([0, 1])
__unit__.add([1, 0])
__unit__.add([1, 1])

__case__("count([0, 0]) on the unit square", 1, __unit__.count([0, 0]))

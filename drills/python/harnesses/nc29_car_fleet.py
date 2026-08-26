try:
    (carFleet)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])", 3, carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]))
__case__("carFleet(10, [3], [3])", 1, carFleet(10, [3], [3]))
__case__("carFleet(100, [0, 2, 4], [4, 2, 1])", 1, carFleet(100, [0, 2, 4], [4, 2, 1]))
__case__("carFleet(10, [6, 8], [3, 2])", 2, carFleet(10, [6, 8], [3, 2]))
__case__("carFleet(10, [], [])", 0, carFleet(10, [], []))
__case__("carFleet(10, [0, 4, 2], [2, 1, 3])", 1, carFleet(10, [0, 4, 2], [2, 1, 3]))

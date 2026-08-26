try:
    (alienOrder)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("alienOrder(['wrt','wrf','er','ett','rftt'])", "wertf", alienOrder(["wrt", "wrf", "er", "ett", "rftt"]))
__case__("alienOrder(['z','x'])", "zx", alienOrder(["z", "x"]))
__case__("alienOrder(['z','x','z']) -- contradictory", "", alienOrder(["z", "x", "z"]))
__case__("alienOrder(['abc','ab']) -- a word before its own prefix", "", alienOrder(["abc", "ab"]))
__case__("alienOrder(['z','z'])", "z", alienOrder(["z", "z"]))
__case__("alienOrder(['x','y','z'])", "xyz", alienOrder(["x", "y", "z"]))

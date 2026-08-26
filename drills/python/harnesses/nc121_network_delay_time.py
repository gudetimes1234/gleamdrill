try:
    (networkDelayTime)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2)", 2, networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2))
__case__("networkDelayTime([[1,2,1]], 2, 1)", 1, networkDelayTime([[1, 2, 1]], 2, 1))
__case__("networkDelayTime([[1,2,1]], 2, 2) -- node 1 is unreachable", -1, networkDelayTime([[1, 2, 1]], 2, 2))
__case__("networkDelayTime([], 1, 1)", 0, networkDelayTime([], 1, 1))
__case__("networkDelayTime(the long way round is shorter, 3, 1)", 3, networkDelayTime([[1, 2, 1], [2, 3, 2], [1, 3, 4]], 3, 1))

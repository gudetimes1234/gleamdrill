try:
    (cloneGraph)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("cloneGraph([[1,3],[0,2],[1,3],[0,2]], 0)", [[1, 3], [0, 2], [1, 3], [0, 2]], cloneGraph([[1, 3], [0, 2], [1, 3], [0, 2]], 0))
__case__("cloneGraph([[1],[0]], 0)", [[1], [0]], cloneGraph([[1], [0]], 0))
__case__("cloneGraph([[]], 0)", [[]], cloneGraph([[]], 0))
__case__("cloneGraph([], 0)", [], cloneGraph([], 0))
__case__("cloneGraph([[1],[0],[3],[2]], 2) -- renumbered", [[1], [0]], cloneGraph([[1], [0], [3], [2]], 2))
__case__("cloneGraph([[],[]], 1) -- only the reachable part", [[]], cloneGraph([[], []], 1))

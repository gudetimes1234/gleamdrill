try:
    (pacificAtlantic)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__grid__ = [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]

__case__("pacificAtlantic(the 5x5 example)", [(0, 4), (1, 3), (1, 4), (2, 2), (3, 0), (3, 1), (4, 0)], sorted(tuple(p) for p in pacificAtlantic(__grid__)))
__case__("pacificAtlantic([[1]])", [(0, 0)], sorted(tuple(p) for p in pacificAtlantic([[1]])))
__case__("pacificAtlantic([])", [], sorted(tuple(p) for p in pacificAtlantic([])))
__case__("pacificAtlantic([[1,1],[1,1]])", [(0, 0), (0, 1), (1, 0), (1, 1)], sorted(tuple(p) for p in pacificAtlantic([[1, 1], [1, 1]])))

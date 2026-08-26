try:
    (maxAreaOfIsland)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxAreaOfIsland([[1,1,0],[1,0,0],[0,0,1]])", 3, maxAreaOfIsland([[1, 1, 0], [1, 0, 0], [0, 0, 1]]))
__case__("maxAreaOfIsland([[0,0],[0,0]])", 0, maxAreaOfIsland([[0, 0], [0, 0]]))
__case__("maxAreaOfIsland([])", 0, maxAreaOfIsland([]))
__case__("maxAreaOfIsland([[1]])", 1, maxAreaOfIsland([[1]]))
__case__("maxAreaOfIsland([[1,1,1],[1,1,1]])", 6, maxAreaOfIsland([[1, 1, 1], [1, 1, 1]]))

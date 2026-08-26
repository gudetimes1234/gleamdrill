try:
    (countComponents)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("countComponents(5, [[0,1],[1,2],[3,4]])", 2, countComponents(5, [[0, 1], [1, 2], [3, 4]]))
__case__("countComponents(5, [[0,1],[1,2],[2,3],[3,4]])", 1, countComponents(5, [[0, 1], [1, 2], [2, 3], [3, 4]]))
__case__("countComponents(3, [])", 3, countComponents(3, []))
__case__("countComponents(0, [])", 0, countComponents(0, []))
__case__("countComponents(1, [])", 1, countComponents(1, []))
__case__("countComponents(4, [[0,1],[1,0]])", 3, countComponents(4, [[0, 1], [1, 0]]))

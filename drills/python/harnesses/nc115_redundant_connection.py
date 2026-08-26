try:
    (findRedundantConnection)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("findRedundantConnection([[1,2],[1,3],[2,3]])", [2, 3], list(findRedundantConnection([(1, 2), (1, 3), (2, 3)])))
__case__("findRedundantConnection([[1,2],[2,3],[3,4],[1,4],[1,5]])", [1, 4], list(findRedundantConnection([(1, 2), (2, 3), (3, 4), (1, 4), (1, 5)])))
__case__("findRedundantConnection([[1,2],[2,1]])", [2, 1], list(findRedundantConnection([(1, 2), (2, 1)])))

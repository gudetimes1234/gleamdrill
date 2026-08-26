try:
    (validTree)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("validTree(5, [[0,1],[0,2],[0,3],[1,4]])", True, validTree(5, [[0, 1], [0, 2], [0, 3], [1, 4]]))
__case__("validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])", False, validTree(5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]))
__case__("validTree(1, [])", True, validTree(1, []))
__case__("validTree(0, [])", True, validTree(0, []))
__case__("validTree(2, []) -- disconnected", False, validTree(2, []))
__case__("validTree(4, [[0,1],[2,3]]) -- two trees", False, validTree(4, [[0, 1], [2, 3]]))

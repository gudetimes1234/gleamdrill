try:
    (canFinish)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("canFinish(2, [[1,0]])", True, canFinish(2, [[1, 0]]))
__case__("canFinish(2, [[1,0],[0,1]])", False, canFinish(2, [[1, 0], [0, 1]]))
__case__("canFinish(1, [])", True, canFinish(1, []))
__case__("canFinish(0, [])", True, canFinish(0, []))
__case__("canFinish(4, [[1,0],[2,1],[3,2]])", True, canFinish(4, [[1, 0], [2, 1], [3, 2]]))
__case__("canFinish(3, [[0,1],[1,2],[2,0]])", False, canFinish(3, [[0, 1], [1, 2], [2, 0]]))

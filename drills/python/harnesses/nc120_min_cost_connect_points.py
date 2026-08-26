try:
    (minCostConnectPoints)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("minCostConnectPoints(the five-point example)", 20, minCostConnectPoints([[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]))
__case__("minCostConnectPoints([[3,12],[-2,5],[-4,1]])", 18, minCostConnectPoints([[3, 12], [-2, 5], [-4, 1]]))
__case__("minCostConnectPoints([])", 0, minCostConnectPoints([]))
__case__("minCostConnectPoints([[1,1]]) -- nothing to connect", 0, minCostConnectPoints([[1, 1]]))
__case__("minCostConnectPoints([[0,0],[0,5]])", 5, minCostConnectPoints([[0, 0], [0, 5]]))

try:
    (minCostClimbingStairs)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("minCostClimbingStairs([10, 15, 20])", 15, minCostClimbingStairs([10, 15, 20]))
__case__("minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])", 6, minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]))
__case__("minCostClimbingStairs([0, 0])", 0, minCostClimbingStairs([0, 0]))
__case__("minCostClimbingStairs([1, 2])", 1, minCostClimbingStairs([1, 2]))
__case__("minCostClimbingStairs([0, 1, 1, 0])", 1, minCostClimbingStairs([0, 1, 1, 0]))
__case__("minCostClimbingStairs([])", 0, minCostClimbingStairs([]))

try:
    (climbStairs)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("climbStairs(2)", 2, climbStairs(2))
__case__("climbStairs(3)", 3, climbStairs(3))
__case__("climbStairs(1)", 1, climbStairs(1))
__case__("climbStairs(0)", 1, climbStairs(0))
__case__("climbStairs(10)", 89, climbStairs(10))
__case__("climbStairs(45)", 1836311903, climbStairs(45))

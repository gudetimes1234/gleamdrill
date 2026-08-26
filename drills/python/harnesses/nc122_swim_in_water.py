try:
    (swimInWater)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("swimInWater([[0,2],[1,3]])", 3, swimInWater([[0, 2], [1, 3]]))
__case__("swimInWater(the 5x5 spiral)", 16, swimInWater([[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]))
__case__("swimInWater([[0]])", 0, swimInWater([[0]]))
__case__("swimInWater([[3,2],[1,0]]) -- the start is the deepest cell", 3, swimInWater([[3, 2], [1, 0]]))

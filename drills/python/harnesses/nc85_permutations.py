try:
    (permute)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

# The outer order is free but the order *within* each permutation is the answer.
def __sorted__(nums):
    return sorted(",".join(str(v) for v in p) for p in permute(nums))

__case__("permute([1, 2, 3])", ["1,2,3", "1,3,2", "2,1,3", "2,3,1", "3,1,2", "3,2,1"], __sorted__([1, 2, 3]))
__case__("permute([0, 1])", ["0,1", "1,0"], __sorted__([0, 1]))
__case__("permute([1])", ["1"], __sorted__([1]))
__case__("permute([])", [""], __sorted__([]))
__case__("permute of four elements count", 24, len(permute([1, 2, 3, 4])))

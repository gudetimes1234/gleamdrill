try:
    (subsetsWithDup)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

def __sorted__(nums):
    return sorted(",".join(str(v) for v in sorted(s)) for s in subsetsWithDup(nums))

__case__("subsetsWithDup([1, 2, 2])", ["", "1", "1,2", "1,2,2", "2", "2,2"], __sorted__([1, 2, 2]))
__case__("subsetsWithDup([0])", ["", "0"], __sorted__([0]))
__case__("subsetsWithDup([])", [""], __sorted__([]))
__case__("subsetsWithDup([1, 1, 1])", ["", "1", "1,1", "1,1,1"], __sorted__([1, 1, 1]))
__case__("subsetsWithDup([4, 4, 4, 1, 4]) count", 10, len(subsetsWithDup([4, 4, 4, 1, 4])))

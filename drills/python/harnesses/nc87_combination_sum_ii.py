try:
    (combinationSum2)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

def __sorted__(candidates, target):
    return sorted(",".join(str(v) for v in sorted(c)) for c in combinationSum2(candidates, target))

__case__("combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)", ["1,1,6", "1,2,5", "1,7", "2,6"], __sorted__([10, 1, 2, 7, 6, 1, 5], 8))
__case__("combinationSum2([2, 5, 2, 1, 2], 5)", ["1,2,2", "5"], __sorted__([2, 5, 2, 1, 2], 5))
__case__("combinationSum2([], 3)", [], __sorted__([], 3))
__case__("combinationSum2([1], 1)", ["1"], __sorted__([1], 1))
__case__("combinationSum2([2], 1)", [], __sorted__([2], 1))

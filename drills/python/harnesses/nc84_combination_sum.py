try:
    (combinationSum)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

def __sorted__(candidates, target):
    return sorted(",".join(str(v) for v in sorted(c)) for c in combinationSum(candidates, target))

__case__("combinationSum([2, 3, 6, 7], 7)", ["2,2,3", "7"], __sorted__([2, 3, 6, 7], 7))
__case__("combinationSum([2, 3, 5], 8)", ["2,2,2,2", "2,3,3", "3,5"], __sorted__([2, 3, 5], 8))
__case__("combinationSum([2], 1)", [], __sorted__([2], 1))
__case__("combinationSum([1], 0)", [""], __sorted__([1], 0))
__case__("combinationSum([], 3)", [], __sorted__([], 3))

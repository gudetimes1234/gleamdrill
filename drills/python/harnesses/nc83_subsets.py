try:
    (subsets)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

# Both the outer order and the order within each subset are free.
def __sorted__(nums):
    return sorted(",".join(str(v) for v in sorted(s)) for s in subsets(nums))

__case__("subsets([1, 2, 3])", ["", "1", "1,2", "1,2,3", "1,3", "2", "2,3", "3"], __sorted__([1, 2, 3]))
__case__("subsets([0])", ["", "0"], __sorted__([0]))
__case__("subsets([])", [""], __sorted__([]))
__case__("subsets of five elements count", 32, len(subsets([1, 2, 3, 4, 5])))

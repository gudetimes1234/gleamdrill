try:
    (KthLargest)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

def __stream__(k, initial, added):
    store = KthLargest(k, initial)
    return [store.add(value) for value in added]

__case__("k = 3 over [4, 5, 8, 2] then 3, 5, 10, 9, 4", [4, 5, 5, 8, 8], __stream__(3, [4, 5, 8, 2], [3, 5, 10, 9, 4]))
__case__("k = 1 over [] then 1, 2, 0", [1, 2, 2], __stream__(1, [], [1, 2, 0]))
__case__("k = 2 over [] then 5, 5", [None, 5], __stream__(2, [], [5, 5]))

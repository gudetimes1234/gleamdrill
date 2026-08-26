try:
    (canCompleteCircuit)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])", 3, canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]))
__case__("canCompleteCircuit([2, 3, 4], [3, 4, 3])", -1, canCompleteCircuit([2, 3, 4], [3, 4, 3]))
__case__("canCompleteCircuit([5], [4])", 0, canCompleteCircuit([5], [4]))
__case__("canCompleteCircuit([1, 2], [2, 1])", 1, canCompleteCircuit([1, 2], [2, 1]))
__case__("canCompleteCircuit([], [])", -1, canCompleteCircuit([], []))
__case__("canCompleteCircuit([3, 1, 1], [1, 2, 2])", 0, canCompleteCircuit([3, 1, 1], [1, 2, 2]))

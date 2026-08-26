try:
    (leastInterval)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("leastInterval(['A','A','A','B','B','B'], 2)", 8, leastInterval(["A", "A", "A", "B", "B", "B"], 2))
__case__("leastInterval(['A','A','A','B','B','B'], 0)", 6, leastInterval(["A", "A", "A", "B", "B", "B"], 0))
__case__("leastInterval(['A','A','A','B','B','B'], 3)", 10, leastInterval(["A", "A", "A", "B", "B", "B"], 3))
__case__("leastInterval([], 2)", 0, leastInterval([], 2))
__case__("leastInterval(['A'], 5)", 1, leastInterval(["A"], 5))
__case__("leastInterval(four As and six singles, 2)", 10, leastInterval(["A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2))

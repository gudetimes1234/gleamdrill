try:
    (bfsOrder)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__graph__ = {"a": ["b", "c"], "b": ["d"], "c": ["d"], "d": []}
__case__("bfsOrder(graph, 'a')", ["a", "b", "c", "d"], bfsOrder(__graph__, "a"))
__case__("bfsOrder({'x': []}, 'x')", ["x"], bfsOrder({"x": []}, "x"))

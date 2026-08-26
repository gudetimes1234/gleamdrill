try:
    (change)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("change(5, [1, 2, 5])", 4, change(5, [1, 2, 5]))
__case__("change(3, [2])", 0, change(3, [2]))
__case__("change(10, [10])", 1, change(10, [10]))
__case__("change(0, [1])", 1, change(0, [1]))
__case__("change(5, [])", 0, change(5, []))
__case__("change(11, [1, 2, 5])", 11, change(11, [1, 2, 5]))

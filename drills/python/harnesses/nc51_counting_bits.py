try:
    (countBits)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("countBits(5)", [0, 1, 1, 2, 1, 2], countBits(5))
__case__("countBits(2)", [0, 1, 1], countBits(2))
__case__("countBits(0)", [0], countBits(0))
__case__("countBits(8)", [0, 1, 1, 2, 1, 2, 2, 3, 1], countBits(8))

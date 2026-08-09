try:
    (joinUpper)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("joinUpper(['g', 'o'])", "GO", joinUpper(["g", "o"]))
__case__("joinUpper([])", "", joinUpper([]))

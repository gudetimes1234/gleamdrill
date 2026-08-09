try:
    (reversedString, everySecond, lastN, trimEnds)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("reversedString('gleam')", "maelg", reversedString("gleam"))
__case__("everySecond('abcdef')", "ace", everySecond("abcdef"))
__case__("lastN('drill', 3)", "ill", lastN("drill", 3))
__case__("trimEnds('~mid~')", "mid", trimEnds("~mid~"))

try:
    (isHappy)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("isHappy(19)", True, isHappy(19))
__case__("isHappy(2)", False, isHappy(2))
__case__("isHappy(1)", True, isHappy(1))
__case__("isHappy(7)", True, isHappy(7))
__case__("isHappy(4)", False, isHappy(4))
__case__("isHappy(100)", True, isHappy(100))

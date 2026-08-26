try:
    (myPow)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("myPow(2.0, 10)", 1024.0, myPow(2.0, 10))
__case__("myPow(2.0, -2)", 0.25, myPow(2.0, -2))
__case__("myPow(2.0, 0)", 1.0, myPow(2.0, 0))
__case__("myPow(0.5, 3)", 0.125, myPow(0.5, 3))
__case__("myPow(-2.0, 3)", -8.0, myPow(-2.0, 3))
__case__("myPow(2.0, 1)", 2.0, myPow(2.0, 1))
__case__("myPow(0.0, 5)", 0.0, myPow(0.0, 5))

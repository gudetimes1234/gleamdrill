try:
    (reverse)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("reverse(123)", 321, reverse(123))
__case__("reverse(-123)", -321, reverse(-123))
__case__("reverse(120)", 21, reverse(120))
__case__("reverse(0)", 0, reverse(0))
__case__("reverse(1534236469)", 0, reverse(1534236469))
__case__("reverse(-2147483648)", 0, reverse(-2147483648))
__case__("reverse(1463847412)", 2147483641, reverse(1463847412))

try:
    (reverseBits)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("reverseBits(43261596)", 964176192, reverseBits(43261596))
__case__("reverseBits(4294967293)", 3221225471, reverseBits(4294967293))
__case__("reverseBits(0)", 0, reverseBits(0))
__case__("reverseBits(1)", 2147483648, reverseBits(1))

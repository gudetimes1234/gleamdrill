try:
    (numDecodings)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("numDecodings('12')", 2, numDecodings('12'))
__case__("numDecodings('226')", 3, numDecodings('226'))
__case__("numDecodings('06')", 0, numDecodings('06'))
__case__("numDecodings('0')", 0, numDecodings('0'))
__case__("numDecodings('')", 0, numDecodings(''))
__case__("numDecodings('10')", 1, numDecodings('10'))
__case__("numDecodings('2101')", 1, numDecodings('2101'))
__case__("numDecodings('11106')", 2, numDecodings('11106'))

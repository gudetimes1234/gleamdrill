try:
    (hammingWeight)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("hammingWeight(11)", 3, hammingWeight(11))
__case__("hammingWeight(128)", 1, hammingWeight(128))
__case__("hammingWeight(0)", 0, hammingWeight(0))
__case__("hammingWeight(2147483645)", 30, hammingWeight(2147483645))
__case__("hammingWeight(1)", 1, hammingWeight(1))

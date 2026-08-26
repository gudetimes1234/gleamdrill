try:
    (partition)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

# The order of pieces within a partition is the answer, so only the outer list
# is normalised. Comma rather than a pipe: a pipe sorts after letters.
def __sorted__(s):
    return sorted(",".join(pieces) for pieces in partition(s))

__case__("partition('aab')", ["a,a,b", "aa,b"], __sorted__("aab"))
__case__("partition('a')", ["a"], __sorted__("a"))
__case__("partition('')", [""], __sorted__(""))
__case__("partition('aba')", ["a,b,a", "aba"], __sorted__("aba"))
__case__("partition('abc')", ["a,b,c"], __sorted__("abc"))

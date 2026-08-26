try:
    (partitionLabels)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("partitionLabels('ababcbacadefegdehijhklij')", [9, 7, 8], partitionLabels('ababcbacadefegdehijhklij'))
__case__("partitionLabels('eccbbbbdec')", [10], partitionLabels('eccbbbbdec'))
__case__("partitionLabels('a')", [1], partitionLabels('a'))
__case__("partitionLabels('')", [], partitionLabels(''))
__case__("partitionLabels('abc')", [1, 1, 1], partitionLabels('abc'))

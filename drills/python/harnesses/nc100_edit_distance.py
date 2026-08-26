try:
    (minDistance)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("minDistance('horse', 'ros')", 3, minDistance('horse', 'ros'))
__case__("minDistance('intention', 'execution')", 5, minDistance('intention', 'execution'))
__case__("minDistance('', 'abc')", 3, minDistance('', 'abc'))
__case__("minDistance('abc', '')", 3, minDistance('abc', ''))
__case__("minDistance('abc', 'abc')", 0, minDistance('abc', 'abc'))
__case__("minDistance('kitten', 'sitting')", 3, minDistance('kitten', 'sitting'))

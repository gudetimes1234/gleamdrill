try:
    (checkInclusion)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("checkInclusion('ab', 'eidbaooo')", True, checkInclusion("ab", "eidbaooo"))
__case__("checkInclusion('ab', 'eidboaoo')", False, checkInclusion("ab", "eidboaoo"))
__case__("checkInclusion('adc', 'dcda')", True, checkInclusion("adc", "dcda"))

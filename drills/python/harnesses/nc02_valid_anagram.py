try:
    (isAnagram)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("isAnagram('anagram', 'nagaram')", True, isAnagram("anagram", "nagaram"))
__case__("isAnagram('rat', 'car')", False, isAnagram("rat", "car"))
__case__("isAnagram('', '')", True, isAnagram("", ""))
__case__("isAnagram('a', 'ab')", False, isAnagram("a", "ab"))

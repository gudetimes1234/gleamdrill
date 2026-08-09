try:
    (groupAnagrams)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__normalised__ = sorted(sorted(group) for group in groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
__case__("groupAnagrams(['eat','tea','tan','ate','nat','bat'])", [["ate", "eat", "tea"], ["bat"], ["nat", "tan"]], __normalised__)
__case__("groupAnagrams([])", [], sorted(groupAnagrams([])))
__case__("groupAnagrams(['a'])", [["a"]], sorted(groupAnagrams(["a"])))

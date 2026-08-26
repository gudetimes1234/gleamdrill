try:
    (findWords)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__board__ = [list(row) for row in ["oaan", "etae", "ihkr", "iflv"]]

__case__("findWords(board, ['oath','pea','eat','rain'])", ["eat", "oath"], sorted(findWords(__board__, ["oath", "pea", "eat", "rain"])))
__case__("findWords([['a','b'],['c','d']], ['abcb'])", [], sorted(findWords([["a", "b"], ["c", "d"]], ["abcb"])))
__case__("findWords([['a']], ['a'])", ["a"], sorted(findWords([["a"]], ["a"])))
__case__("findWords(board, [])", [], sorted(findWords(__board__, [])))
__case__("findWords([], ['a'])", [], sorted(findWords([], ["a"])))

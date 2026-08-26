try:
    (wordBreak)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("wordBreak('leetcode', ['leet', 'code'])", True, wordBreak('leetcode', ['leet', 'code']))
__case__("wordBreak('applepenapple', ['apple', 'pen'])", True, wordBreak('applepenapple', ['apple', 'pen']))
__case__("wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])", False, wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']))
__case__("wordBreak('', ['a'])", True, wordBreak('', ['a']))
__case__("wordBreak('a', [])", False, wordBreak('a', []))
__case__("wordBreak('aaaaaaa', ['aaa', 'aaaa'])", True, wordBreak('aaaaaaa', ['aaa', 'aaaa']))

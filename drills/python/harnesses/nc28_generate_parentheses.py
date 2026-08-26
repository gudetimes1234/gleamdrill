try:
    (generateParenthesis)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

# Any order is acceptable, so every case compares sorted.
def __sorted__(n):
    return sorted(generateParenthesis(n))

__case__("generateParenthesis(1)", ["()"], __sorted__(1))
__case__("generateParenthesis(2)", ["(())", "()()"], __sorted__(2))
__case__("generateParenthesis(3)", ["((()))", "(()())", "(())()", "()(())", "()()()"], __sorted__(3))
__case__("generateParenthesis(4) count", 14, len(__sorted__(4)))

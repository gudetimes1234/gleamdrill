try:
    (isValid)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("isValid('()[]{}')", True, isValid("()[]{}"))
__case__("isValid('(]')", False, isValid("(]"))
__case__("isValid('([)]')", False, isValid("([)]"))
__case__("isValid('{[]}')", True, isValid("{[]}"))
__case__("isValid('(')", False, isValid("("))

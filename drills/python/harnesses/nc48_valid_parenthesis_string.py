try:
    (checkValidString)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("checkValidString('()')", True, checkValidString('()'))
__case__("checkValidString('(*)')", True, checkValidString('(*)'))
__case__("checkValidString('(*))')", True, checkValidString('(*))'))
__case__("checkValidString(')(')", False, checkValidString(')('))
__case__("checkValidString('')", True, checkValidString(''))
__case__("checkValidString('*')", True, checkValidString('*'))
__case__("checkValidString(')*')", False, checkValidString(')*'))
__case__("checkValidString('(*()')", True, checkValidString('(*()'))

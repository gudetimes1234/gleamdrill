try:
    (multiply)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("multiply('2', '3')", '6', multiply('2', '3'))
__case__("multiply('123', '456')", '56088', multiply('123', '456'))
__case__("multiply('0', '52')", '0', multiply('0', '52'))
__case__("multiply('9', '9')", '81', multiply('9', '9'))
__case__("multiply('999', '999')", '998001', multiply('999', '999'))
__case__("multiply('123456789', '987654321')", '121932631112635269', multiply('123456789', '987654321'))

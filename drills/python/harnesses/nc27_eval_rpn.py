try:
    (evalRPN)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("evalRPN(['2', '1', '+', '3', '*'])", 9, evalRPN(["2", "1", "+", "3", "*"]))
__case__("evalRPN(['4', '13', '5', '/', '+'])", 6, evalRPN(["4", "13", "5", "/", "+"]))
__case__("evalRPN(['-3', '2', '/'])", -1, evalRPN(["-3", "2", "/"]))
__case__("evalRPN(['5'])", 5, evalRPN(["5"]))
__case__("evalRPN(the long one)", 22, evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]))

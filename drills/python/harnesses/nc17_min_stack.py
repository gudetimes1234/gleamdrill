try:
    (MinStack)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__stack__ = MinStack()
__stack__.push(-2)
__stack__.push(0)
__stack__.push(-3)
__case__("getMin() after push -2, 0, -3", -3, __stack__.getMin())
__stack__.pop()
__case__("top() after pop()", 0, __stack__.top())
__case__("getMin() after pop()", -2, __stack__.getMin())

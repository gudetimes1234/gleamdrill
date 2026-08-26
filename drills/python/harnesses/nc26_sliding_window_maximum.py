try:
    (maxSlidingWindow)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)", [3, 3, 5, 5, 6, 7], maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))
__case__("maxSlidingWindow([1], 1)", [1], maxSlidingWindow([1], 1))
__case__("maxSlidingWindow([], 3)", [], maxSlidingWindow([], 3))
__case__("maxSlidingWindow([9, 8, 7, 6], 2)", [9, 8, 7], maxSlidingWindow([9, 8, 7, 6], 2))
__case__("maxSlidingWindow([1, -1], 1)", [1, -1], maxSlidingWindow([1, -1], 1))
__case__("maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4)", [7, 7, 7, 7, 7], maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4))

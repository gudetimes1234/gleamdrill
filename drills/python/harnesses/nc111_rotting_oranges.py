try:
    (orangesRotting)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("orangesRotting([[2,1,1],[1,1,0],[0,1,1]])", 4, orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]]))
__case__("orangesRotting([[2,1,1],[0,1,1],[1,0,1]])", -1, orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]]))
__case__("orangesRotting([[0,2]])", 0, orangesRotting([[0, 2]]))
__case__("orangesRotting([])", 0, orangesRotting([]))
__case__("orangesRotting([[1]])", -1, orangesRotting([[1]]))
__case__("orangesRotting([[0]])", 0, orangesRotting([[0]]))

try:
    (mergeKLists, ListNode)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

def __chain__(values):
    head = None
    for value in reversed(values):
        head = ListNode(value, head)
    return head

def __values__(node):
    out = []
    while node is not None and len(out) < 1000:
        out.append(node.val)
        node = node.next
    return out

def __merged__(lists):
    return __values__(mergeKLists([__chain__(values) for values in lists]))

__case__("mergeKLists([[1,4,5],[1,3,4],[2,6]])", [1, 1, 2, 3, 4, 4, 5, 6], __merged__([[1, 4, 5], [1, 3, 4], [2, 6]]))
__case__("mergeKLists([]) -- no lists at all", [], __merged__([]))
__case__("mergeKLists([[]]) -- one empty list", [], __merged__([[]]))
__case__("mergeKLists([[1],[],[0]])", [0, 1], __merged__([[1], [], [0]]))
__case__("mergeKLists([[2,2],[2]]) -- ties everywhere", [2, 2, 2], __merged__([[2, 2], [2]]))

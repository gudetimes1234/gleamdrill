try:
    (mergeTwoLists, ListNode)
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

__case__("mergeTwoLists([1,2,4], [1,3,4])", [1, 1, 2, 3, 4, 4], __values__(mergeTwoLists(__chain__([1, 2, 4]), __chain__([1, 3, 4]))))
__case__("mergeTwoLists([], [])", [], __values__(mergeTwoLists(__chain__([]), __chain__([]))))
__case__("mergeTwoLists([], [0])", [0], __values__(mergeTwoLists(__chain__([]), __chain__([0]))))
__case__("mergeTwoLists([5], [1,2,3])", [1, 2, 3, 5], __values__(mergeTwoLists(__chain__([5]), __chain__([1, 2, 3]))))

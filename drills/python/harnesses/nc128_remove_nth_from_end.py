try:
    (removeNthFromEnd, ListNode)
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

__case__("removeNthFromEnd([1,2,3,4,5], 2)", [1, 2, 3, 5], __values__(removeNthFromEnd(__chain__([1, 2, 3, 4, 5]), 2)))
__case__("removeNthFromEnd([1], 1)", [], __values__(removeNthFromEnd(__chain__([1]), 1)))
__case__("removeNthFromEnd([1,2], 1)", [1], __values__(removeNthFromEnd(__chain__([1, 2]), 1)))
__case__("removeNthFromEnd([1,2], 2) -- the head goes", [2], __values__(removeNthFromEnd(__chain__([1, 2]), 2)))
__case__("removeNthFromEnd([1,2,3], 5) -- nothing to remove", [1, 2, 3], __values__(removeNthFromEnd(__chain__([1, 2, 3]), 5)))

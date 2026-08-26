try:
    (reverseKGroup, ListNode)
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

def __grouped__(values, k):
    return __values__(reverseKGroup(__chain__(values), k))

__case__("reverseKGroup([1,2,3,4,5], 2)", [2, 1, 4, 3, 5], __grouped__([1, 2, 3, 4, 5], 2))
__case__("reverseKGroup([1,2,3,4,5], 3) -- the last two are left alone", [3, 2, 1, 4, 5], __grouped__([1, 2, 3, 4, 5], 3))
__case__("reverseKGroup([1,2,3,4], 4)", [4, 3, 2, 1], __grouped__([1, 2, 3, 4], 4))
__case__("reverseKGroup([1,2,3], 1) -- nothing changes", [1, 2, 3], __grouped__([1, 2, 3], 1))
__case__("reverseKGroup([1,2], 5) -- the group never fills", [1, 2], __grouped__([1, 2], 5))
__case__("reverseKGroup([], 2)", [], __grouped__([], 2))

try:
    (reverseList, ListNode)
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

__case__("reverseList([1,2,3,4,5])", [5, 4, 3, 2, 1], __values__(reverseList(__chain__([1, 2, 3, 4, 5]))))
__case__("reverseList([1,2])", [2, 1], __values__(reverseList(__chain__([1, 2]))))
__case__("reverseList([]) -- an empty list", [], __values__(reverseList(__chain__([]))))
__case__("reverseList([7])", [7], __values__(reverseList(__chain__([7]))))

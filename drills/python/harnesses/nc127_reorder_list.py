try:
    (reorderList, ListNode)
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

# reorderList rewrites the list in place, so the head it was given is the answer
# whether or not it also returns one.
def __reordered__(values):
    head = __chain__(values)
    returned = reorderList(head)
    return __values__(head if head is not None else returned)

__case__("reorderList([1,2,3,4])", [1, 4, 2, 3], __reordered__([1, 2, 3, 4]))
__case__("reorderList([1,2,3,4,5]) -- the middle stays last", [1, 5, 2, 4, 3], __reordered__([1, 2, 3, 4, 5]))
__case__("reorderList([1,2])", [1, 2], __reordered__([1, 2]))
__case__("reorderList([1])", [1], __reordered__([1]))
__case__("reorderList([])", [], __reordered__([]))

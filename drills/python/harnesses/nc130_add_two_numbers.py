try:
    (addTwoNumbers, ListNode)
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

__case__("addTwoNumbers([2,4,3], [5,6,4]) -- 342 + 465", [7, 0, 8], __values__(addTwoNumbers(__chain__([2, 4, 3]), __chain__([5, 6, 4]))))
__case__("addTwoNumbers([0], [0])", [0], __values__(addTwoNumbers(__chain__([0]), __chain__([0]))))
__case__("addTwoNumbers([9,9,9], [1]) -- the carry runs all the way", [0, 0, 0, 1], __values__(addTwoNumbers(__chain__([9, 9, 9]), __chain__([1]))))
__case__("addTwoNumbers([5], [5]) -- the carry outlives both", [0, 1], __values__(addTwoNumbers(__chain__([5]), __chain__([5]))))
__case__("addTwoNumbers([1,2], [3,4,5]) -- different lengths", [4, 6, 5], __values__(addTwoNumbers(__chain__([1, 2]), __chain__([3, 4, 5]))))

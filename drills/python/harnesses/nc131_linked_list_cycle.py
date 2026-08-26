try:
    (hasCycle, ListNode)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

# pos is the index the tail links back to, or None for a list that ends.
def __chain__(values, pos):
    nodes = [ListNode(value) for value in values]
    for i, node in enumerate(nodes):
        node.next = nodes[i + 1] if i + 1 < len(nodes) else None
    if nodes and pos is not None:
        nodes[-1].next = nodes[pos]
    return nodes[0] if nodes else None

__case__("hasCycle([3,2,0,-4], tail -> index 1)", True, hasCycle(__chain__([3, 2, 0, -4], 1)))
__case__("hasCycle([1,2], no cycle)", False, hasCycle(__chain__([1, 2], None)))
__case__("hasCycle([1], no cycle)", False, hasCycle(__chain__([1], None)))
__case__("hasCycle([1], tail -> index 0)", True, hasCycle(__chain__([1], 0)))
__case__("hasCycle([])", False, hasCycle(__chain__([], None)))
__case__("hasCycle([1,2], tail -> index 0)", True, hasCycle(__chain__([1, 2], 0)))

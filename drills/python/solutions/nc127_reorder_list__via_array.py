class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def reorderList(head):
    # Collect the nodes into an array first, then relink them by index from both
    # ends. O(n) extra space against the in-place version's O(1) -- but random
    # access is exactly what a linked list lacks, so this makes visible what the
    # midpoint-and-reverse dance is buying.
    nodes = []  # @1
    node = head  # @2
    while node is not None:  # @3
        nodes.append(node)  # @4
        node = node.next  # @4

    low, high = 0, len(nodes) - 1  # @5
    while low < high:  # @6
        nodes[low].next = nodes[high]  # @7
        low += 1  # @8
        if low == high:  # @9
            break  # @9
        nodes[high].next = nodes[low]  # @10
        high -= 1  # @11

    if nodes:  # @12
        nodes[low].next = None  # @12
    return head  # @13

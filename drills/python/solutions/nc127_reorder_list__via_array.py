class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def reorderList(head):
    # Collect the nodes into an array first, then relink them by index from both
    # ends. O(n) extra space against the in-place version's O(1) -- but random
    # access is exactly what a linked list lacks, so this makes visible what the
    # midpoint-and-reverse dance is buying.
    nodes = []
    node = head
    while node is not None:
        nodes.append(node)
        node = node.next

    low, high = 0, len(nodes) - 1
    while low < high:
        nodes[low].next = nodes[high]
        low += 1
        if low == high:
            break
        nodes[high].next = nodes[low]
        high -= 1

    if nodes:
        nodes[low].next = None
    return head

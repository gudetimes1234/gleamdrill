class Node:
    def __init__(self, val=0, next=None, random=None):
        self.val = val
        self.next = next
        self.random = random


def copyRandomList(head):
    # The list itself replaces the map: each copy is spliced in directly after
    # its original, so "the copy of node X" is always X.next -- no lookup and no
    # O(n) table. Three passes instead of two, and the last one has to unweave
    # the two lists again, restoring the original exactly as it was.
    node = head
    while node is not None:
        node.next = Node(node.val, node.next)
        node = node.next.next

    node = head
    while node is not None:
        if node.random is not None:
            node.next.random = node.random.next
        node = node.next.next

    copy = head.next if head is not None else None
    node = head
    while node is not None:
        original_next = node.next.next
        if original_next is not None:
            node.next.next = original_next.next
        node.next = original_next
        node = original_next

    return copy

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
    node = head  # @1
    while node is not None:  # @2
        node.next = Node(node.val, node.next)  # @3
        node = node.next.next  # @4

    node = head  # @5
    while node is not None:  # @6
        if node.random is not None:  # @7
            node.next.random = node.random.next  # @8
        node = node.next.next  # @9

    copy = head.next if head is not None else None  # @10
    node = head  # @11
    while node is not None:  # @12
        original_next = node.next.next  # @13
        if original_next is not None:  # @14
            node.next.next = original_next.next  # @14
        node.next = original_next  # @15
        node = original_next  # @16

    return copy  # @17

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def reverseKGroup(head, k):
    # Count once, then reverse exactly length // k groups. One length
    # calculation instead of a look-ahead per group -- and it makes the boundary
    # explicit: everything past the last whole group is untouched, however long
    # it is.
    length = 0
    node = head
    while node is not None:
        length, node = length + 1, node.next

    dummy = ListNode(0, head)
    before = dummy
    node = head

    for _ in range(length // k):
        first, previous = node, None
        for _ in range(k):
            following = node.next
            node.next = previous
            previous, node = node, following
        before.next = previous
        first.next = node
        before = first

    return dummy.next

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def reverseKGroup(head, k):
    # Look ahead k nodes *before* reversing anything. That check is the whole
    # difficulty: once the rewiring starts there is no way to tell how far it
    # got, so a short final group would be reversed by mistake.
    dummy = ListNode(0, head)
    before = dummy

    while True:
        after = before
        for _ in range(k):
            after = after.next
            if after is None:
                return dummy.next

        node, previous = before.next, after.next
        first = node
        for _ in range(k):
            following = node.next
            node.next = previous
            previous, node = node, following

        before.next = previous
        before = first

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def removeNthFromEnd(head, n):
    # Count first, then walk to the position. Two passes rather than one, and it
    # says outright what the two-pointer version encodes in a gap: nth from the
    # end is length minus n from the front. Where a list cannot be walked twice
    # -- a stream, say -- that is exactly the assumption that fails.
    length = 0
    node = head
    while node is not None:
        length, node = length + 1, node.next

    index = length - n
    if index < 0:
        return head

    dummy = ListNode(0, head)
    before = dummy
    for _ in range(index):
        before = before.next
    before.next = before.next.next
    return dummy.next

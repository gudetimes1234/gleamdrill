class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def removeNthFromEnd(head, n):
    # Count first, then walk to the position. Two passes rather than one, and it
    # says outright what the two-pointer version encodes in a gap: nth from the
    # end is length minus n from the front. Where a list cannot be walked twice
    # -- a stream, say -- that is exactly the assumption that fails.
    length = 0  # @1
    node = head  # @2
    while node is not None:  # @3
        length, node = length + 1, node.next  # @4

    index = length - n  # @5
    if index < 0:  # @6
        return head  # @6

    dummy = ListNode(0, head)  # @7
    before = dummy  # @8
    for _ in range(index):  # @9
        before = before.next  # @9
    before.next = before.next.next  # @10
    return dummy.next  # @11

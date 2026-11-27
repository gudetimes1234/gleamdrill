class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def removeNthFromEnd(head, n):
    # Two pointers n apart. When the leading one runs off the end, the trailing
    # one is on the node *before* the doomed one -- which is the node that has
    # to be rewritten, and the reason the gap is opened from a dummy rather than
    # from the head.
    dummy = ListNode(0, head)  # @1
    behind = ahead = dummy  # @2

    for _ in range(n):  # @3
        if ahead.next is None:  # @4
            return head  # @4
        ahead = ahead.next  # @5

    while ahead.next is not None:  # @6
        behind, ahead = behind.next, ahead.next  # @7

    behind.next = behind.next.next  # @8
    return dummy.next  # @9

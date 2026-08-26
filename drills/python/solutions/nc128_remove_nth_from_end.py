class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def removeNthFromEnd(head, n):
    # Two pointers n apart. When the leading one runs off the end, the trailing
    # one is on the node *before* the doomed one -- which is the node that has
    # to be rewritten, and the reason the gap is opened from a dummy rather than
    # from the head.
    dummy = ListNode(0, head)
    behind = ahead = dummy

    for _ in range(n):
        if ahead.next is None:
            return head
        ahead = ahead.next

    while ahead.next is not None:
        behind, ahead = behind.next, ahead.next

    behind.next = behind.next.next
    return dummy.next

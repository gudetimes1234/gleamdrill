class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def reverseList(head):
    # Three pointers and no new nodes: remember where you came from, look ahead
    # before rewriting the link, then step on. Losing the look-ahead is the
    # classic bug -- once head.next has been overwritten, the rest of the list
    # is unreachable.
    previous = None  # @1
    while head is not None:  # @2
        following = head.next  # @3
        head.next = previous  # @4
        previous = head  # @5
        head = following  # @6
    return previous  # @7

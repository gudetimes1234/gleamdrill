class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def reverseList(head):
    # Three pointers and no new nodes: remember where you came from, look ahead
    # before rewriting the link, then step on. Losing the look-ahead is the
    # classic bug -- once head.next has been overwritten, the rest of the list
    # is unreachable.
    previous = None
    while head is not None:
        following = head.next
        head.next = previous
        previous = head
        head = following
    return previous

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def reverseList(head):
    # Reverse the rest, then hook the current node onto its end. The new head
    # comes back unchanged through every frame, which is why it is returned
    # rather than tracked -- and head.next.next = head is the whole rewiring,
    # done on the way back out. O(n) stack, against the loop's O(1).
    if head is None or head.next is None:
        return head
    reversed_rest = reverseList(head.next)
    head.next.next = head
    head.next = None
    return reversed_rest

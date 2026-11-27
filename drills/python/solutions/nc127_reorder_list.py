class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def reorderList(head):
    # Three separate steps, each of which is its own drill: find the middle with
    # a slow and a fast pointer, reverse the back half, then weave the two
    # together. That decomposition is the whole trick -- none of the three needs
    # to know about the others.
    if head is None or head.next is None:  # @1
        return head  # @1

    slow, fast = head, head.next  # @2
    while fast is not None and fast.next is not None:  # @3
        slow, fast = slow.next, fast.next.next  # @4

    second = slow.next  # @5
    slow.next = None  # @6

    previous = None  # @7
    while second is not None:  # @8
        following = second.next  # @9
        second.next = previous  # @10
        previous, second = second, following  # @11

    first, second = head, previous  # @12
    while second is not None:  # @13
        first_next, second_next = first.next, second.next  # @14
        first.next = second  # @15
        second.next = first_next  # @16
        first, second = first_next, second_next  # @17

    return head  # @18

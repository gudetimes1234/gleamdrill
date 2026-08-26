class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def reorderList(head):
    # Three separate steps, each of which is its own drill: find the middle with
    # a slow and a fast pointer, reverse the back half, then weave the two
    # together. That decomposition is the whole trick -- none of the three needs
    # to know about the others.
    if head is None or head.next is None:
        return head

    slow, fast = head, head.next
    while fast is not None and fast.next is not None:
        slow, fast = slow.next, fast.next.next

    second = slow.next
    slow.next = None

    previous = None
    while second is not None:
        following = second.next
        second.next = previous
        previous, second = second, following

    first, second = head, previous
    while second is not None:
        first_next, second_next = first.next, second.next
        first.next = second
        second.next = first_next
        first, second = first_next, second_next

    return head

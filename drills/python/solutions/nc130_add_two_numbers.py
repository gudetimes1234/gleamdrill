class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def addTwoNumbers(l1, l2):
    # Both numbers arrive least significant digit first, which is exactly the
    # order addition wants -- no reversing and no length matching. The loop
    # condition includes the carry, because 5 + 5 produces a digit that neither
    # input has a node for.
    dummy = ListNode()
    tail = dummy
    carry = 0

    while l1 is not None or l2 is not None or carry:
        total = carry
        if l1 is not None:
            total, l1 = total + l1.val, l1.next
        if l2 is not None:
            total, l2 = total + l2.val, l2.next
        carry, digit = divmod(total, 10)
        tail.next = ListNode(digit)
        tail = tail.next

    return dummy.next

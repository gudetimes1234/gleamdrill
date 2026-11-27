class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def addTwoNumbers(l1, l2):
    # Both numbers arrive least significant digit first, which is exactly the
    # order addition wants -- no reversing and no length matching. The loop
    # condition includes the carry, because 5 + 5 produces a digit that neither
    # input has a node for.
    dummy = ListNode()  # @1
    tail = dummy  # @1
    carry = 0  # @2

    while l1 is not None or l2 is not None or carry:  # @3
        total = carry  # @4
        if l1 is not None:  # @5
            total, l1 = total + l1.val, l1.next  # @5
        if l2 is not None:  # @6
            total, l2 = total + l2.val, l2.next  # @6
        carry, digit = divmod(total, 10)  # @7
        tail.next = ListNode(digit)  # @8
        tail = tail.next  # @9

    return dummy.next  # @10

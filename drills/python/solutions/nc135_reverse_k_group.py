class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def reverseKGroup(head, k):
    # Look ahead k nodes *before* reversing anything. That check is the whole
    # difficulty: once the rewiring starts there is no way to tell how far it
    # got, so a short final group would be reversed by mistake.
    dummy = ListNode(0, head)  # @1
    before = dummy  # @2

    while True:  # @3
        after = before  # @4
        for _ in range(k):  # @5
            after = after.next  # @6
            if after is None:  # @7
                return dummy.next  # @7

        node, previous = before.next, after.next  # @8
        first = node  # @9
        for _ in range(k):  # @10
            following = node.next  # @11
            node.next = previous  # @12
            previous, node = node, following  # @13

        before.next = previous  # @14
        before = first  # @15

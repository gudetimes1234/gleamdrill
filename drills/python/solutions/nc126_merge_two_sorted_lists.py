class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def mergeTwoLists(list1, list2):
    # The dummy head is what removes the special case: without it, the first
    # node has to be chosen separately from all the others because there is
    # nothing to attach it to. No new nodes beyond it -- the existing ones are
    # spliced.
    dummy = ListNode()  # @1
    tail = dummy  # @2

    while list1 is not None and list2 is not None:  # @3
        if list1.val <= list2.val:  # @4
            tail.next, list1 = list1, list1.next  # @5
        else:  # @6
            tail.next, list2 = list2, list2.next  # @6
        tail = tail.next  # @7

    # Whichever list is left is already sorted and already linked.
    tail.next = list1 if list1 is not None else list2  # @8
    return dummy.next  # @9

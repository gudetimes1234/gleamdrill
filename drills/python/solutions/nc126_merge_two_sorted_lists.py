class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def mergeTwoLists(list1, list2):
    # The dummy head is what removes the special case: without it, the first
    # node has to be chosen separately from all the others because there is
    # nothing to attach it to. No new nodes beyond it -- the existing ones are
    # spliced.
    dummy = ListNode()
    tail = dummy

    while list1 is not None and list2 is not None:
        if list1.val <= list2.val:
            tail.next, list1 = list1, list1.next
        else:
            tail.next, list2 = list2, list2.next
        tail = tail.next

    # Whichever list is left is already sorted and already linked.
    tail.next = list1 if list1 is not None else list2
    return dummy.next

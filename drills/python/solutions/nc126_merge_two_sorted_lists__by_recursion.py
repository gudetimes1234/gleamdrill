class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def mergeTwoLists(list1, list2):
    # Take the smaller head and let the recursion produce the rest. No dummy and
    # no tail pointer -- the return value is the join -- at the cost of a frame
    # per node.
    if list1 is None:
        return list2
    if list2 is None:
        return list1
    if list1.val <= list2.val:
        list1.next = mergeTwoLists(list1.next, list2)
        return list1
    list2.next = mergeTwoLists(list1, list2.next)
    return list2

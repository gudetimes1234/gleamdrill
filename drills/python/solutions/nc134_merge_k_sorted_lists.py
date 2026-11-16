class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def mergeKLists(lists):
    # Merge in pairs, halving the number of lists each round. Folding them in
    # one at a time re-walks the growing result every time -- O(k*n) -- while
    # pairing gives O(n log k) for the same merges, because each element is
    # copied once per round and there are log k rounds.
    lists = [head for head in lists if head is not None]  # @1
    if not lists:  # @2
        return None  # @2

    while len(lists) > 1:  # @3
        merged = []  # @4
        for i in range(0, len(lists), 2):  # @5
            if i + 1 < len(lists):  # @6
                merged.append(merge(lists[i], lists[i + 1]))  # @6
            else:  # @7
                merged.append(lists[i])  # @7
        lists = merged  # @8

    return lists[0]  # @9


def merge(first, second):
    dummy = ListNode()  # @10
    tail = dummy  # @10
    while first is not None and second is not None:  # @11
        if first.val <= second.val:  # @12
            tail.next, first = first, first.next  # @12
        else:  # @13
            tail.next, second = second, second.next  # @13
        tail = tail.next  # @14
    tail.next = first if first is not None else second  # @15
    return dummy.next  # @16

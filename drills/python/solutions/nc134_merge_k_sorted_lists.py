class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def mergeKLists(lists):
    # Merge in pairs, halving the number of lists each round. Folding them in
    # one at a time re-walks the growing result every time -- O(k*n) -- while
    # pairing gives O(n log k) for the same merges, because each element is
    # copied once per round and there are log k rounds.
    lists = [head for head in lists if head is not None]
    if not lists:
        return None

    while len(lists) > 1:
        merged = []
        for i in range(0, len(lists), 2):
            if i + 1 < len(lists):
                merged.append(merge(lists[i], lists[i + 1]))
            else:
                merged.append(lists[i])
        lists = merged

    return lists[0]


def merge(first, second):
    dummy = ListNode()
    tail = dummy
    while first is not None and second is not None:
        if first.val <= second.val:
            tail.next, first = first, first.next
        else:
            tail.next, second = second, second.next
        tail = tail.next
    tail.next = first if first is not None else second
    return dummy.next

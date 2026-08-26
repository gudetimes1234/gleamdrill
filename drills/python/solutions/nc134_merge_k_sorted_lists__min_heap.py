import heapq


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def mergeKLists(lists):
    # Take the smallest head across all the lists, over and over -- the heap is
    # what makes "smallest of k" cost O(log k) instead of a scan of k. The index
    # in the tuple is a tie-break, because two equal values would otherwise send
    # heapq on to compare the nodes themselves, which have no ordering.
    frontier = [(head.val, i, head) for i, head in enumerate(lists) if head is not None]
    heapq.heapify(frontier)

    dummy = ListNode()
    tail = dummy
    while frontier:
        _value, i, node = heapq.heappop(frontier)
        tail.next = node
        tail = node
        if node.next is not None:
            heapq.heappush(frontier, (node.next.val, i, node.next))

    tail.next = None
    return dummy.next

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
    frontier = [(head.val, i, head) for i, head in enumerate(lists) if head is not None]  # @1
    heapq.heapify(frontier)  # @2

    dummy = ListNode()  # @3
    tail = dummy  # @3
    while frontier:  # @4
        _value, i, node = heapq.heappop(frontier)  # @5
        tail.next = node  # @6
        tail = node  # @6
        if node.next is not None:  # @7
            heapq.heappush(frontier, (node.next.val, i, node.next))  # @7

    tail.next = None  # @8
    return dummy.next  # @9

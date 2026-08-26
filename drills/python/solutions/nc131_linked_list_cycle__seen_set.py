class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def hasCycle(head):
    # Remember every node visited and stop when one repeats. Obvious, correct,
    # and O(n) memory -- which is the whole cost the two-pointer version
    # removes. Note that it is the *nodes* that go in the set, not their values:
    # repeated values are ordinary, repeated nodes are the cycle.
    seen = set()
    while head is not None:
        if id(head) in seen:
            return True
        seen.add(id(head))
        head = head.next
    return False

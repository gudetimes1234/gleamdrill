class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def hasCycle(head):
    # Floyd's tortoise and hare. One pointer takes single steps, the other
    # double; if there is a loop the fast one is going round it and gains one
    # place per step on the slow one, so it must eventually land on it. If there
    # is no loop the fast one runs off the end first. Constant memory, and no
    # node is ever marked.
    slow = fast = head  # @1
    while fast is not None and fast.next is not None:  # @2
        slow, fast = slow.next, fast.next.next  # @3
        if slow is fast:  # @4
            return True  # @4
    return False  # @5

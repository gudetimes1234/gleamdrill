class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def addTwoNumbers(l1, l2):
    # Turn both lists into whole numbers, add, and take the sum apart again. It
    # reads well and is fine in Python, whose integers are arbitrary precision
    # -- but it is the version that breaks the moment the language has a
    # fixed-width integer, which is precisely why the problem is posed as a list
    # of digits.
    total = value(l1) + value(l2)

    dummy = ListNode()
    tail = dummy
    while True:
        total, digit = divmod(total, 10)
        tail.next = ListNode(digit)
        tail = tail.next
        if total == 0:
            return dummy.next


def value(node):
    total, place = 0, 1
    while node is not None:
        total += node.val * place
        place *= 10
        node = node.next
    return total

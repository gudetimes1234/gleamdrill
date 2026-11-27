class Node:
    def __init__(self, val=0, next=None, random=None):
        self.val = val
        self.next = next
        self.random = random


def copyRandomList(head):
    # One pass to create every copy, a second to wire them up. Resolving a link
    # on first sight cannot work: it may point at a node not yet copied, which
    # is the whole difficulty of the problem -- and a map from original node to
    # copy is what removes it.
    copies = {None: None}  # @1

    node = head  # @2
    while node is not None:  # @3
        copies[node] = Node(node.val)  # @4
        node = node.next  # @5

    node = head  # @6
    while node is not None:  # @7
        copies[node].next = copies[node.next]  # @8
        copies[node].random = copies[node.random]  # @9
        node = node.next  # @10

    return copies[head]  # @11

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
    copies = {None: None}

    node = head
    while node is not None:
        copies[node] = Node(node.val)
        node = node.next

    node = head
    while node is not None:
        copies[node].next = copies[node.next]
        copies[node].random = copies[node.random]
        node = node.next

    return copies[head]

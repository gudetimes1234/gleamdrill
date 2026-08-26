class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def goodNodes(root):
    # Carry the largest value seen on the way down. A node is good when nothing
    # above it is bigger, so the check needs no knowledge of the tree below --
    # which is what makes one pass enough. The root is always good, and passing
    # its own value down as the initial maximum is what says so.
    if root is None:
        return 0
    return count(root, root.val)


def count(node, largest):
    if node is None:
        return 0
    here = 1 if node.val >= largest else 0
    largest = max(largest, node.val)
    return here + count(node.left, largest) + count(node.right, largest)

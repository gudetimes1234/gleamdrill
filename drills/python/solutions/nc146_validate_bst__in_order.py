class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def isValidBST(root):
    # A binary search tree is exactly a tree whose in-order walk is strictly
    # increasing -- that is the definition, restated so that no bounds have to
    # be threaded anywhere. The cost is the list: O(n) memory against the range
    # check's O(depth).
    values = []
    inOrder(root, values)
    return all(a < b for a, b in zip(values, values[1:]))


def inOrder(node, values):
    if node is None:
        return
    inOrder(node.left, values)
    values.append(node.val)
    inOrder(node.right, values)

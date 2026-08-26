class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def isValidBST(root):
    # Check against a range, not against the parent. A node can be larger than
    # its own parent and still break the order, because the constraint comes
    # from an ancestor further up -- and that is the whole difficulty. Going
    # left tightens the upper bound, going right the lower one.
    return within(root, None, None)


def within(node, low, high):
    if node is None:
        return True
    if low is not None and node.val <= low:
        return False
    if high is not None and node.val >= high:
        return False
    return within(node.left, low, node.val) and within(node.right, node.val, high)

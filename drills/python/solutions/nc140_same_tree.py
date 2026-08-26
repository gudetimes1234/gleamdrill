class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def isSameTree(p, q):
    # Walk both trees in step. Two empties match, an empty and a node never do,
    # and two nodes match when their values do and both pairs of children do.
    # The same shape is what Subtree of Another Tree and Symmetric Tree are
    # built from, which is why it is worth writing out rather than comparing
    # serialisations.
    if p is None and q is None:
        return True
    if p is None or q is None:
        return False
    return p.val == q.val and isSameTree(p.left, q.left) and isSameTree(p.right, q.right)

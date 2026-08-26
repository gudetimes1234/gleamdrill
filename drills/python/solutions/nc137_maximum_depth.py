class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def maxDepth(root):
    # One more than the deeper of the two children, with an empty tree at zero.
    # The whole problem is that base case: everything else is the definition of
    # depth read aloud.
    if root is None:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))

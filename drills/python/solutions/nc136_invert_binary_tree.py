class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def invertTree(root):
    # Swap the children, then invert each of them. The swap and the recursion
    # are the same two lines, which is why this is the shortest tree problem
    # there is -- and why the order does not matter: swapping before or after
    # recursing gives the same tree.
    if root is None:  # @1
        return None  # @1
    root.left, root.right = invertTree(root.right), invertTree(root.left)  # @2
    return root  # @3

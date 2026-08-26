class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def diameterOfBinaryTree(root):
    # Ask every node how tall its two sides are and keep the largest sum.
    # Correct and obvious, but height is recomputed from scratch at every node,
    # so a balanced tree costs O(n log n) and a spindly one O(n^2) -- which is
    # exactly what returning the height alongside the answer avoids.
    if root is None:
        return 0
    return max(
        height(root.left) + height(root.right),
        diameterOfBinaryTree(root.left),
        diameterOfBinaryTree(root.right),
    )


def height(node):
    return 0 if node is None else 1 + max(height(node.left), height(node.right))
